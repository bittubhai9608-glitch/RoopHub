package in.roophub.auth;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.security.GeneralSecurityException;
import java.util.Locale;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        SecurityUtil.securityHeaders(response);
        request.setCharacterEncoding("UTF-8");

        if (!SecurityUtil.validCsrf(request)) {
            response.sendRedirect(request.getContextPath() + "/auth?error=csrf");
            return;
        }

        String email = request.getParameter("email");
        String password = request.getParameter("password");
        if (email == null || password == null || email.length() > 254
                || password.length() > 128) {
            response.sendRedirect(request.getContextPath() + "/auth?error=invalid");
            return;
        }
        email = email.trim().toLowerCase(Locale.ROOT);

        String sql = "SELECT CUSTOMER_ID, FULL_NAME, EMAIL, PASSWORD_HASH "
                   + "FROM ROOPHUB_CUSTOMERS WHERE EMAIL = ?";
        try (Connection con = DBUtil.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next() || !PasswordUtil.verify(password, rs.getString("PASSWORD_HASH"))) {
                    response.sendRedirect(request.getContextPath() + "/auth?error=invalid");
                    return;
                }

                HttpSession oldSession = request.getSession(false);
                if (oldSession != null) oldSession.invalidate();
                HttpSession session = request.getSession(true);
                session.setMaxInactiveInterval(20 * 60);
                session.setAttribute("customerId", rs.getLong("CUSTOMER_ID"));
                session.setAttribute("customerName", rs.getString("FULL_NAME"));
                session.setAttribute("customerEmail", rs.getString("EMAIL"));
                // Generate a new CSRF token for the authenticated session.
                SecurityUtil.csrfToken(session);

                response.sendRedirect(request.getContextPath() + "/dashboard");
            }
        } catch (SQLException | GeneralSecurityException ex) {
            getServletContext().log("RoopHub login failed", ex);
            response.sendRedirect(request.getContextPath() + "/auth?error=server");
        }
    }
}
