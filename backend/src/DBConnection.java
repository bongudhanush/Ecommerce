import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Creates JDBC connections for the ecommerce backend.
 *
 * Configure JDBC_URL, DB_USER, and DB_PASSWORD in the process environment.
 */
public final class DBConnection {
    private static final String JDBC_URL = "JDBC_URL";
    private static final String DB_USER = "DB_USER";
    private static final String DB_PASSWORD = "DB_PASSWORD";

    private DBConnection() {
    }

    public static Connection getConnection() throws SQLException {
        String url = requiredEnvironmentVariable(JDBC_URL);
        String user = requiredEnvironmentVariable(DB_USER);
        String password = requiredEnvironmentVariable(DB_PASSWORD);

        return DriverManager.getConnection(url, user, password);
    }

    private static String requiredEnvironmentVariable(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(
                    "Missing required environment variable: " + name);
        }
        return value;
    }

    public static void main(String[] args) {
        try (Connection connection = getConnection()) {
            System.out.println("JDBC connection successful: "
                    + connection.getMetaData().getDatabaseProductName());
        } catch (SQLException | IllegalStateException error) {
            System.err.println("JDBC connection failed: " + error.getMessage());
            System.exit(1);
        }
    }
}