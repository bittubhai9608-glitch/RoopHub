package in.roophub.auth;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.security.GeneralSecurityException;
import java.util.Locale;
import java.util.regex.Pattern;

@WebServlet("/signup")
public class SignupServlet extends HttpServlet {
    private static final Pattern EMAIL = Pattern.compile(
            "^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$",
            Pattern.CASE_INSENSITIVE);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        SecurityUtil.securityHeaders(response);
        request.setCharacterEncoding("UTF-8");

        if (!SecurityUtil.validCsrf(request)) {
            response.sendRedirect(request.getContextPath() + "/auth?error=csrf");
            return;
        }

        String name = trim(request.getParameter("fullName"));
        String email = trim(request.getParameter("email")).toLowerCase(Locale.ROOT);
        String password = request.getParameter("password");
        String confirm = request.getParameter("confirmPassword");

        if (name == null || name.length() < 2 || name.length() > 80
                || name.chars().anyMatch(Character::isISOControl)
                || email == null || email.length() > 254 || !EMAIL.matcher(email).matches()
                || password == null || password.length() < 12 || password.length() > 128
                || !password.equals(confirm)) {
            response.sendRedirect(request.getContextPath() + "/auth?error=invalid");
            return;
        }

        try {
            String hash = PasswordUtil.hash(password);
            String code = OtpUtil.generate();
            String sql = "INSERT INTO ROOPHUB_PENDING_SIGNUPS "
                    + "(EMAIL, FULL_NAME, PASSWORD_HASH, OTP_HASH, EXPIRES_AT) "
                    + "VALUES (?, ?, ?, ?, SYSTIMESTAMP + INTERVAL '10' MINUTE)";
            try (Connection con = DBUtil.getConnection();
                 PreparedStatement ps = con.prepareStatement(sql)) {
                ps.setString(1, email);
                ps.setString(2, name);
                ps.setString(3, hash);
                ps.setString(4, OtpUtil.hash(code));
                ps.executeUpdate();
            }
            try {
                MailUtil.sendSignupOtp(email, name, code);
            } catch (Exception ex) {
                try (Connection con = DBUtil.getConnection();
                     PreparedStatement ps = con.prepareStatement(
                             "DELETE FROM ROOPHUB_PENDING_SIGNUPS WHERE EMAIL = ?")) {
                    ps.setString(1, email);
                    ps.executeUpdate();
                } catch (SQLException cleanupError) {
                    ex.addSuppressed(cleanupError);
                }
                throw ex;
            }
            request.getSession(true).setAttribute("pendingSignupEmail", email);
            response.sendRedirect(request.getContextPath() + "/auth?otp=sent");
        } catch (SQLException | GeneralSecurityException ex) {
            getServletContext().log("RoopHub signup failed", ex);
            String error = ex instanceof SQLException && ((SQLException) ex).getErrorCode() == 1
                    ? "exists" : "server";
            response.sendRedirect(request.getContextPath() + "/auth?error=" + error);
        } catch (Exception ex) {
            getServletContext().log("RoopHub signup email delivery failed", ex);
            response.sendRedirect(request.getContextPath() + "/auth?error=email");
        }
    }

    private static String trim(String value) {
        return value == null ? null : value.trim();
    }
}
