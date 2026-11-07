package in.roophub.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        SecurityUtil.securityHeaders(response);
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("customerId") == null) {
            response.sendRedirect(request.getContextPath() + "/auth");
            return;
        }
        request.setAttribute("csrfToken", SecurityUtil.csrfToken(session));
        request.getRequestDispatcher("/dashboard.jsp").forward(request, response);
    }
}
