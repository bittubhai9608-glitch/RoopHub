<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    if (session == null || session.getAttribute("customerId") == null) {
        response.sendRedirect(request.getContextPath() + "/auth");
        return;
    }
    String customerName = (String) session.getAttribute("customerName");
    String customerEmail = (String) session.getAttribute("customerEmail");
    if (customerName == null) customerName = "RoopHub Customer";
    if (customerEmail == null) customerEmail = "";
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>My Account | RoopHub</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f4fff6;color:#222}
header{background:#fff;padding:18px 6%;display:flex;justify-content:space-between;align-items:center;gap:15px;box-shadow:0 2px 12px #0000000d}
.logo{font-size:28px;font-weight:800}.red{color:#e51b23}.black{color:#111}
button{background:#16803d;color:#fff;border:0;padding:11px 18px;border-radius:8px;cursor:pointer;font-weight:bold}
main{max-width:750px;margin:45px auto;padding:20px}.card{background:#fff;border-radius:16px;padding:30px;box-shadow:0 8px 25px #0000000d}
.info{padding:15px;background:#edfff1;border-radius:9px;margin:20px 0;overflow-wrap:anywhere}
@media(max-width:480px){header{padding:15px;flex-wrap:wrap}main{margin:20px auto}.card{padding:22px}}
</style>
</head>
<body>
<header>
  <div class="logo"><span class="red">R</span><span class="black">OOP</span><span class="red">Hub</span></div>
  <form method="post" action="<%= request.getContextPath() %>/logout">
    <input type="hidden" name="csrfToken" value="<%= request.getAttribute("csrfToken") %>">
    <button type="submit">Logout</button>
  </form>
</header>
<main><section class="card">
  <h1>Welcome, <%= org.owasp.encoder.Encode.forHtml(customerName) %>!</h1>
  <p>You are successfully logged in to your RoopHub customer account.</p>
  <div class="info">
    <p><strong>Customer name:</strong> <%= org.owasp.encoder.Encode.forHtml(customerName) %></p>
    <p><strong>Email:</strong> <%= org.owasp.encoder.Encode.forHtml(customerEmail) %></p>
  </div>
  <p><a href="<%= request.getContextPath() %>/">Continue shopping</a></p>
</section></main>
</body>
</html>
