# JDBC order API

The React checkout submits orders to a small Java HTTP API. The API uses
`src/DBConnection.java` and MySQL Connector/J to store order and item records.
The API binds to localhost by default and does not hard-code credentials.

## Database setup

Run `backend/schema.sql` against MySQL to create the `ecommerce` database and
order tables. For example, from the repository root:

```powershell
Get-Content backend\schema.sql | mysql -u root -p
```

Set these variables in the PowerShell terminal that runs the API. Keep your
actual password private and do not commit it:

```powershell
$env:JDBC_URL = "jdbc:mysql://localhost:3306/ecommerce"
$env:DB_USER = "root"
$env:DB_PASSWORD = "your-password"
```

## Run the API

From the repository root, compile and start the Java API:

```powershell
javac -cp "backend/lib/*" -d backend/out backend/src/DBConnection.java backend/src/OrderApiServer.java
java -cp "backend/out;backend/lib/*" OrderApiServer
```

Leave that terminal open. In another terminal, run the frontend with `npm run
dev` and submit checkout. Vite's default `http://localhost:5173` and
`http://127.0.0.1:5173` origins are allowed. Set `API_ALLOWED_ORIGINS` to a
comma-separated list to allow other frontend origins, or set `API_HOST` and
`API_PORT` to change the API bind address and port. To use a different API URL
in the frontend, set `VITE_API_BASE_URL` before starting Vite.

The API stores pending orders and item snapshots; it does not process payments
or authenticate customers. Prices come from the frontend's demo catalog, so
this is not suitable for production payments without server-side pricing and
customer authentication. The existing orders page still keeps its display
state in memory; historical order retrieval is not exposed without customer
authentication.