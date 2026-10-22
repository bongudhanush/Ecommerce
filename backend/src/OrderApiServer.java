import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;

public final class OrderApiServer {
    private static final int MAX_REQUEST_BYTES = 64 * 1024;
    private static final String ALLOWED_ORIGINS = System.getenv()
            .getOrDefault("API_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173");

    private OrderApiServer() {
    }

    public static void main(String[] args) throws IOException {
        String host = System.getenv().getOrDefault("API_HOST", "127.0.0.1");
        int port = Integer.parseInt(System.getenv().getOrDefault("API_PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(host, port), 0);
        server.createContext("/api/orders", OrderApiServer::handleOrders);
        server.setExecutor(Executors.newFixedThreadPool(8));
        server.start();
        System.out.println("Order API listening on http://" + host + ":" + port);
    }

    private static void handleOrders(HttpExchange exchange) throws IOException {
        String origin = exchange.getRequestHeaders().getFirst("Origin");
        if (origin != null && !isAllowedOrigin(origin)) {
            sendJson(exchange, 403, "{\"error\":\"Origin not allowed\"}");
            return;
        }
        if (origin != null) {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", origin);
            exchange.getResponseHeaders().set("Vary", "Origin");
        }
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }
        if (!"/api/orders".equals(exchange.getRequestURI().getPath())) {
            sendJson(exchange, 404, "{\"error\":\"Not found\"}");
            return;
        }
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.getResponseHeaders().set("Allow", "POST, OPTIONS");
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }

        try {
            Map<String, List<String>> form = readForm(exchange);
            long orderId = saveOrder(form);
            sendJson(exchange, 201, "{\"orderId\":" + orderId + ",\"status\":\"Pending\"}");
        } catch (IllegalArgumentException error) {
            sendJson(exchange, 400, "{\"error\":\"" + jsonEscape(error.getMessage()) + "\"}");
        } catch (SQLException error) {
            System.err.println("Could not save order: " + error.getMessage());
            sendJson(exchange, 500, "{\"error\":\"Could not save order to the database\"}");
        } catch (IOException error) {
            System.err.println("Could not read order request: " + error.getMessage());
            sendJson(exchange, 400, "{\"error\":\"Could not read order request\"}");
        } finally {
            exchange.close();
        }
    }

    private static boolean isAllowedOrigin(String origin) {
        for (String allowedOrigin : ALLOWED_ORIGINS.split(",")) {
            if (origin.equals(allowedOrigin.trim())) {
                return true;
            }
        }
        return false;
    }

    private static Map<String, List<String>> readForm(HttpExchange exchange) throws IOException {
        String contentType = exchange.getRequestHeaders().getFirst("Content-Type");
        if (contentType == null
                || !contentType.toLowerCase().startsWith("application/x-www-form-urlencoded")) {
            throw new IllegalArgumentException("Expected form-encoded order data");
        }

        byte[] body = exchange.getRequestBody().readNBytes(MAX_REQUEST_BYTES + 1);
        if (body.length > MAX_REQUEST_BYTES) {
            throw new IllegalArgumentException("Order request is too large");
        }

        Map<String, List<String>> fields = new HashMap<>();
        String encodedForm = new String(body, StandardCharsets.UTF_8);
        for (String pair : encodedForm.split("&")) {
            if (pair.isEmpty()) {
                continue;
            }
            int separator = pair.indexOf('=');
            String key = decodeFormValue(separator < 0 ? pair : pair.substring(0, separator));
            String value = decodeFormValue(separator < 0 ? "" : pair.substring(separator + 1));
            fields.computeIfAbsent(key, ignored -> new ArrayList<>()).add(value);
        }
        return fields;
    }

    private static String decodeFormValue(String value) {
        try {
            return URLDecoder.decode(value, StandardCharsets.UTF_8);
        } catch (IllegalArgumentException error) {
            throw new IllegalArgumentException("Invalid form encoding");
        }
    }

    private static long saveOrder(Map<String, List<String>> form) throws SQLException {
        String firstName = requiredField(form, "firstName", 100);
        String lastName = requiredField(form, "lastName", 100);
        String email = requiredField(form, "email", 254);
        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Enter a valid email address");
        }
        String street = requiredField(form, "street", 255);
        String city = requiredField(form, "city", 100);
        String state = requiredField(form, "state", 100);
        String zipCode = requiredField(form, "zipCode", 20);
        String country = requiredField(form, "country", 100);
        String phone = requiredField(form, "phone", 30);

        List<String> productIds = requiredList(form, "productId", 100);
        List<String> names = requiredList(form, "productName", 100);
        List<String> sizes = requiredList(form, "size", 100);
        List<String> quantities = requiredList(form, "quantity", 100);
        List<String> prices = requiredList(form, "unitPrice", 100);
        int itemCount = productIds.size();
        if (names.size() != itemCount || sizes.size() != itemCount
                || quantities.size() != itemCount || prices.size() != itemCount) {
            throw new IllegalArgumentException("Order item fields do not match");
        }

        List<OrderItem> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        for (int index = 0; index < itemCount; index++) {
            String productId = productIds.get(index);
            String size = sizes.get(index);
            if (!productId.matches("[A-Za-z0-9_-]{1,40}")
                    || !size.matches("[A-Za-z0-9_-]{1,12}")) {
                throw new IllegalArgumentException("Invalid product or size");
            }
            String name = names.get(index);
            if (name.isBlank() || name.length() > 255) {
                throw new IllegalArgumentException("Invalid product name");
            }
            int quantity = parseInteger(quantities.get(index), 1, 100, "quantity");
            BigDecimal unitPrice = parseMoney(prices.get(index), "unit price");
            subtotal = subtotal.add(unitPrice.multiply(BigDecimal.valueOf(quantity)));
            items.add(new OrderItem(productId, name, size, quantity, unitPrice));
        }

        BigDecimal deliveryFee = parseMoney(singleField(form, "deliveryFee"), "delivery fee");
        BigDecimal total = subtotal.add(deliveryFee);

        String insertOrder = """
                INSERT INTO ecommerce_orders
                    (first_name, last_name, email, street, city, state, zip_code,
                     country, phone, subtotal, delivery_fee, total, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
                """;
        String insertItem = """
                INSERT INTO ecommerce_order_items
                    (order_id, product_id, product_name, size, quantity, unit_price)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

        try (Connection connection = DBConnection.getConnection()) {
            connection.setAutoCommit(false);
            try {
                long orderId;
                try (PreparedStatement statement = connection.prepareStatement(
                        insertOrder, Statement.RETURN_GENERATED_KEYS)) {
                    statement.setString(1, firstName);
                    statement.setString(2, lastName);
                    statement.setString(3, email);
                    statement.setString(4, street);
                    statement.setString(5, city);
                    statement.setString(6, state);
                    statement.setString(7, zipCode);
                    statement.setString(8, country);
                    statement.setString(9, phone);
                    statement.setBigDecimal(10, subtotal);
                    statement.setBigDecimal(11, deliveryFee);
                    statement.setBigDecimal(12, total);
                    statement.executeUpdate();
                    try (ResultSet keys = statement.getGeneratedKeys()) {
                        if (!keys.next()) {
                            throw new SQLException("Database did not return an order ID");
                        }
                        orderId = keys.getLong(1);
                    }
                }

                try (PreparedStatement statement = connection.prepareStatement(insertItem)) {
                    for (OrderItem item : items) {
                        statement.setLong(1, orderId);
                        statement.setString(2, item.productId());
                        statement.setString(3, item.productName());
                        statement.setString(4, item.size());
                        statement.setInt(5, item.quantity());
                        statement.setBigDecimal(6, item.unitPrice());
                        statement.addBatch();
                    }
                    statement.executeBatch();
                }
                connection.commit();
                return orderId;
            } catch (SQLException | RuntimeException error) {
                connection.rollback();
                throw error;
            }
        }
    }

    private static List<String> requiredList(
            Map<String, List<String>> form, String name, int maxItems) {
        List<String> values = form.get(name);
        if (values == null || values.isEmpty() || values.size() > maxItems) {
            throw new IllegalArgumentException("Invalid order items");
        }
        return values;
    }

    private static String requiredField(
            Map<String, List<String>> form, String name, int maxLength) {
        String value = singleField(form, name);
        if (value.isBlank() || value.length() > maxLength) {
            throw new IllegalArgumentException("Invalid " + name);
        }
        return value;
    }

    private static String singleField(Map<String, List<String>> form, String name) {
        List<String> values = form.get(name);
        if (values == null || values.size() != 1) {
            throw new IllegalArgumentException("Missing or repeated " + name);
        }
        return values.get(0);
    }

    private static BigDecimal parseMoney(String value, String name) {
        try {
            BigDecimal amount = new BigDecimal(value);
            if (amount.signum() < 0 || amount.precision() > 10 || amount.scale() > 2) {
                throw new IllegalArgumentException("Invalid " + name);
            }
            return amount.setScale(2);
        } catch (NumberFormatException error) {
            throw new IllegalArgumentException("Invalid " + name);
        }
    }

    private static int parseInteger(String value, int min, int max, String name) {
        try {
            int number = Integer.parseInt(value);
            if (number < min || number > max) {
                throw new IllegalArgumentException("Invalid " + name);
            }
            return number;
        } catch (NumberFormatException error) {
            throw new IllegalArgumentException("Invalid " + name);
        }
    }

    private static void sendJson(HttpExchange exchange, int status, String body)
            throws IOException {
        byte[] response = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
        exchange.sendResponseHeaders(status, response.length);
        exchange.getResponseBody().write(response);
    }

    private static String jsonEscape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"")
                .replace("\r", "\\r").replace("\n", "\\n");
    }

    private record OrderItem(
            String productId, String productName, String size, int quantity, BigDecimal unitPrice) {
    }
}
