package in.roophub.auth;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/verify-otp")
public class VerifyOtpServlet extends HttpServlet {
    private static final int MAX_ATTEMPTS = 5;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        SecurityUtil.securityHeaders(response);
        request.setCharacterEncoding("UTF-8");
        String context = request.getContextPath();

        if (!SecurityUtil.validCsrf(request)) {
            response.sendRedirect(context + "/auth?error=csrf");
            return;
        }

        HttpSession session = request.getSession(false);
        String email = session == null ? null : (String) session.getAttribute("pendingSignupEmail");
        String code = request.getParameter("otp");
        if (email == null || code == null || !code.matches("\\d{6}")) {
            response.sendRedirect(context + "/auth?error=otp_invalid");
            return;
        }

        try (Connection con = DBUtil.getConnection()) {
            con.setAutoCommit(false);
            try {
                String select = "SELECT FULL_NAME, PASSWORD_HASH, OTP_HASH, ATTEMPTS, "
                        + "CASE WHEN EXPIRES_AT > SYSTIMESTAMP THEN 1 ELSE 0 END AS IS_VALID "
                        + "FROM ROOPHUB_PENDING_SIGNUPS WHERE EMAIL = ? FOR UPDATE";
                String name;
                String passwordHash;
                String expectedHash;
                int attempts;
                boolean unexpired;
                try (PreparedStatement ps = con.prepareStatement(select)) {
                    ps.setString(1, email);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            con.rollback();
                            session.removeAttribute("pendingSignupEmail");
                            response.sendRedirect(context + "/auth?error=otp_expired");
                            return;
                        }
                        name = rs.getString("FULL_NAME");
                        passwordHash = rs.getString("PASSWORD_HASH");
                        expectedHash = rs.getString("OTP_HASH");
                        attempts = rs.getInt("ATTEMPTS");
                        unexpired = rs.getInt("IS_VALID") == 1;
                    }
                }

                if (!unexpired) {
                    deletePending(con, email);
                    con.commit();
                    session.removeAttribute("pendingSignupEmail");
                    response.sendRedirect(context + "/auth?error=otp_expired");
                    return;
                }
                if (attempts >= MAX_ATTEMPTS) {
                    deletePending(con, email);
                    con.commit();
                    session.removeAttribute("pendingSignupEmail");
                    response.sendRedirect(context + "/auth?error=otp_locked");
                    return;
                }

                String submittedHash = OtpUtil.hash(code);
                if (!MessageDigest.isEqual(
                        expectedHash.getBytes(StandardCharsets.US_ASCII),
                        submittedHash.getBytes(StandardCharsets.US_ASCII))) {
                    try (PreparedStatement ps = con.prepareStatement(
                            "UPDATE ROOPHUB_PENDING_SIGNUPS SET ATTEMPTS = ATTEMPTS + 1 WHERE EMAIL = ?")) {
                        ps.setString(1, email);
                        ps.executeUpdate();
                    }
                    if (attempts + 1 >= MAX_ATTEMPTS) {
                        deletePending(con, email);
                        con.commit();
                        session.removeAttribute("pendingSignupEmail");
                        response.sendRedirect(context + "/auth?error=otp_locked");
                        return;
                    }
                    con.commit();
                    response.sendRedirect(context + "/auth?error=otp_invalid");
                    return;
                }

                try (PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO ROOPHUB_CUSTOMERS (FULL_NAME, EMAIL, PASSWORD_HASH) VALUES (?, ?, ?)")) {
                    ps.setString(1, name);
                    ps.setString(2, email);
                    ps.setString(3, passwordHash);
                    ps.executeUpdate();
                }
                deletePending(con, email);
                con.commit();
                session.removeAttribute("pendingSignupEmail");
                response.sendRedirect(context + "/auth?created=1");
            } catch (SQLException | GeneralSecurityException | RuntimeException ex) {
                con.rollback();
                throw ex;
            }
        } catch (SQLException | GeneralSecurityException ex) {
            getServletContext().log("RoopHub OTP verification failed", ex);
            response.sendRedirect(context + "/auth?error=server");
        }
    }

    private static void deletePending(Connection con, String email) throws SQLException {
        try (PreparedStatement ps = con.prepareStatement(
                "DELETE FROM ROOPHUB_PENDING_SIGNUPS WHERE EMAIL = ?")) {
            ps.setString(1, email);
            ps.executeUpdate();
        }
    }
}
