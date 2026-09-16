# JDBC backend

`src/DBConnection.java` provides a reusable JDBC connection for the ecommerce
backend. It does not hard-code database credentials.

## Setup

1. Download the JDBC driver for your database. For MySQL, use the MySQL
   Connector/J JAR.
2. Put the JAR in `backend/lib/`.
3. Set these environment variables in the terminal that runs the backend:

```powershell
$env:JDBC_URL = "jdbc:mysql://localhost:3306/ecommerce"
$env:DB_USER = "root"
$env:DB_PASSWORD = "your-password"
```

4. Compile and run the connection check from the repository root. Replace the
   JAR name with the driver file in `backend/lib/`:

```powershell
javac -d backend/out backend/src/DBConnection.java
java -cp "backend/out;backend/lib/mysql-connector-j-*.jar" DBConnection
```

The JDBC driver is discovered automatically by JDBC 4. If the check succeeds,
`DBConnection.getConnection()` can be used by repository or service classes.