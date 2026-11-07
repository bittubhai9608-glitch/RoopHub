package in.roophub.auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class DBUtil {
    private DBUtil() {}

    public static Connection getConnection() throws SQLException {
        String url = System.getenv("ROOPHUB_DB_URL");
        String user = System.getenv("ROOPHUB_DB_USER");
        String password = System.getenv("ROOPHUB_DB_PASSWORD");

        if (url == null || user == null || password == null) {
            throw new SQLException("Database environment variables are not configured.");
        }
        return DriverManager.getConnection(url, user, password);
    }
}
