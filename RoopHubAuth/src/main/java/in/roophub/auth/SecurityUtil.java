package in.roophub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.util.Base64;

public final class SecurityUtil {
    private static final SecureRandom RANDOM = new SecureRandom();
    private SecurityUtil() {}

    public static String csrfToken(HttpSession session) {
        String token = (String) session.getAttribute("csrfToken");
        if (token == null) {
            byte[] bytes = new byte[32];
            RANDOM.nextBytes(bytes);
            token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
            session.setAttribute("csrfToken", token);
        }
        return token;
    }

    public static boolean validCsrf(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return false;
        String expected = (String) session.getAttribute("csrfToken");
        String actual = request.getParameter("csrfToken");
        return expected != null && actual != null
                && java.security.MessageDigest.isEqual(
                    expected.getBytes(java.nio.charset.StandardCharsets.UTF_8),
                    actual.getBytes(java.nio.charset.StandardCharsets.UTF_8));
    }

    public static void securityHeaders(jakarta.servlet.http.HttpServletResponse response) {
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Content-Security-Policy",
                "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'");
    }

    public static String cleanError(String key) {
        return switch (key == null ? "" : key) {
            case "invalid" -> "Please check your details and try again.";
            case "exists" -> "An account may already exist for this email. Try logging in.";
            case "csrf" -> "Your session expired. Refresh the page and try again.";
            case "email" -> "We could not send the verification code. Check the email service configuration and try again.";
            case "otp_invalid" -> "That verification code is invalid. Check it and try again.";
            case "otp_expired" -> "Your verification code expired. Please create your account again.";
            case "otp_locked" -> "Too many incorrect codes. Please create your account again.";
            case "server" -> "Something went wrong. Please try again later.";
            default -> "";
        };
    }
}
