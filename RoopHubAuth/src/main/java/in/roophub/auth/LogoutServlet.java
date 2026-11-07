package in.roophub.auth;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        SecurityUtil.securityHeaders(response);
        if (!SecurityUtil.validCsrf(request)) {
            response.sendRedirect(request.getContextPath() + "/auth?error=csrf");
            return;
        }
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();
        response.sendRedirect(request.getContextPath() + "/auth");
    }
}
