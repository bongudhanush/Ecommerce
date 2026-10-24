# JDBC database connection

`src/DBConnection.java` creates a MySQL JDBC connection using environment
variables. `schema.sql` creates the database and order tables.

## Database setup

Run `backend/schema.sql` against MySQL to create the `ecommerce` database and
order tables. For example, from the repository root:

```powershell
Get-Content backend\schema.sql | mysql -u root -p
```

Set these variables in the PowerShell terminal that runs the JDBC code. Keep
your actual password private and do not commit it:

```powershell
$env:JDBC_URL = "jdbc:mysql://localhost:3306/ecommerce"
$env:DB_USER = "root"
$env:DB_PASSWORD = "your-password"
```

Compile and test the JDBC connection:

```powershell
javac -cp "backend/lib/*" -d backend/out backend/src/DBConnection.java
java -cp "backend/out;backend/lib/*" DBConnection
```
