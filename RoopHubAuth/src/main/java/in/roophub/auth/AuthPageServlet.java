package in.roophub.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/auth")
public class AuthPageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        SecurityUtil.securityHeaders(response);
        HttpSession session = request.getSession(true);
        request.setAttribute("csrfToken", SecurityUtil.csrfToken(session));
        request.setAttribute("errorMessage",
                SecurityUtil.cleanError(request.getParameter("error")));
        request.setAttribute("otpPending",
                session.getAttribute("pendingSignupEmail") != null
                        && !"1".equals(request.getParameter("created")));
        request.setAttribute("pendingEmail", session.getAttribute("pendingSignupEmail"));
        request.getRequestDispatcher("/auth.jsp").forward(request, response);
    }
}
