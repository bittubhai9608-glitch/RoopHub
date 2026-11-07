<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="in.roophub.auth.SecurityUtil" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login / Signup | RoopHub</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Arial,sans-serif}
body{min-height:100vh;display:grid;place-items:center;padding:20px;background:linear-gradient(135deg,#eaffef,#f4f7ff)}
.card{width:100%;max-width:430px;background:#fff;padding:30px;border-radius:18px;box-shadow:0 10px 35px #00000016}
.logo{text-align:center;font-size:32px;font-weight:800;margin-bottom:8px}.red{color:#e51b23}.black{color:#111}
.tag{text-align:center;color:#777;font-size:13px;margin-bottom:25px}
h2{text-align:center;margin-bottom:8px;color:#222}.sub{text-align:center;color:#777;font-size:14px;margin-bottom:22px}
.tabs{display:flex;background:#f1f5f1;border-radius:9px;padding:4px;margin-bottom:20px}
.tabs button{flex:1;padding:11px;border:0;border-radius:7px;cursor:pointer;font-weight:bold}
.tabs .active{background:#16803d;color:white}
label{display:block;font-size:14px;font-weight:600;margin:14px 0 7px}
input:not([type=checkbox]){width:100%;padding:13px;border:1px solid #ddd;border-radius:8px;outline:none;font-size:15px}
input:focus{border-color:#16803d}.password{position:relative}.password input{padding-right:65px}
.show{position:absolute;right:10px;top:50%;transform:translateY(-50%);border:0;background:none;color:#16803d;cursor:pointer;font-weight:bold}
.options{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:17px 0;font-size:13px}
.remember{display:flex;align-items:center;gap:6px}.remember label{margin:0;font-weight:normal}
a{color:#16803d;text-decoration:none;font-weight:bold}.main{width:100%;padding:14px;border:0;border-radius:8px;background:#16803d;color:white;font-size:16px;font-weight:bold;cursor:pointer}
.main:hover{background:#10672f}.main:disabled{opacity:.6;cursor:wait}
#message{font-size:14px;line-height:1.5;margin-top:15px;text-align:center;overflow-wrap:anywhere;min-height:18px}
.bottom{text-align:center;font-size:14px;color:#666;margin-top:20px}.hidden{display:none}
@media(max-width:420px){.card{padding:24px 19px}}
</style>
</head>
<body>
<div class="card">
  <div class="logo"><span class="red">R</span><span class="black">OOP</span><span class="red">Hub</span></div>
  <p class="tag">Your Smart Online Shopping Destination</p>
<% if (Boolean.TRUE.equals(request.getAttribute("otpPending"))) { %>
  <h2>Verify your email</h2>
  <p class="sub">Enter the 6-digit code sent to <%= org.owasp.encoder.Encode.forHtml((String) request.getAttribute("pendingEmail")) %>.</p>
  <form method="post" action="<%= request.getContextPath() %>/verify-otp">
    <input type="hidden" name="csrfToken" value="<%= request.getAttribute("csrfToken") %>">
    <label for="otp">Verification code</label>
    <input id="otp" name="otp" type="text" inputmode="numeric" pattern="[0-9]{6}"
           minlength="6" maxlength="6" autocomplete="one-time-code" required>
    <button class="main" type="submit">Verify and Create Account</button>
    <p id="message" role="status" aria-live="polite"><%= request.getAttribute("errorMessage") %></p>
  </form>
  <p class="bottom"><a href="<%= request.getContextPath() %>/auth">Back to Login</a></p>
<% } else { %>
  <h2 id="heading">Welcome Back!</h2>
  <p class="sub" id="subtitle">Login to your RoopHub account</p>

  <div class="tabs">
    <button type="button" id="loginTab" class="active">Login</button>
    <button type="button" id="signupTab">Create Account</button>
  </div>

  <form id="loginForm" method="post" action="<%= request.getContextPath() %>/login">
    <input type="hidden" name="csrfToken" value="<%= request.getAttribute("csrfToken") %>">
    <div id="nameGroup" class="hidden">
      <label for="fullName">Full Name</label>
      <input id="fullName" name="fullName" type="text" maxlength="80" autocomplete="name" placeholder="Enter your full name">
    </div>
    <label for="email">Email Address</label>
    <input id="email" name="email" type="email" maxlength="254" autocomplete="email" placeholder="Enter your email" required>
    <label for="password">Password</label>
    <div class="password">
      <input id="password" name="password" type="password" minlength="1" maxlength="128" autocomplete="current-password" placeholder="Enter password" required>
      <button type="button" id="showPassword" class="show">Show</button>
    </div>
    <div id="confirmGroup" class="hidden">
      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" name="confirmPassword" type="password" minlength="12" maxlength="128" autocomplete="new-password" placeholder="Re-enter password">
    </div>
    <div id="options" class="options">
      <span>Secure customer login</span>
      <a href="#" id="forgot">Forgot Password?</a>
    </div>
    <button class="main" id="submitBtn" type="submit">Login</button>
    <p id="message" role="status" aria-live="polite"><%= request.getAttribute("errorMessage") == null ? "" : request.getAttribute("errorMessage") %></p>
  </form>
  <p class="bottom"><a href="<%= request.getContextPath() %>/">← Back to RoopHub Store</a></p>
<% } %>
</div>

<% if (!Boolean.TRUE.equals(request.getAttribute("otpPending"))) { %>
<script>
const form = document.getElementById("loginForm");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const msg = document.getElementById("message");
let mode = "login";

function setMode(next) {
  mode = next;
  const signup = mode === "signup";
  form.action = signup ? "<%= request.getContextPath() %>/signup" : "<%= request.getContextPath() %>/login";
  document.getElementById("heading").textContent = signup ? "Create Account" : "Welcome Back!";
  document.getElementById("subtitle").textContent = signup ? "Join the RoopHub community" : "Login to your RoopHub account";
  document.getElementById("nameGroup").classList.toggle("hidden", !signup);
  document.getElementById("confirmGroup").classList.toggle("hidden", !signup);
  document.getElementById("fullName").required = signup;
  document.getElementById("confirmPassword").required = signup;
  document.getElementById("options").classList.toggle("hidden", signup);
  document.getElementById("password").autocomplete = signup ? "new-password" : "current-password";
  document.getElementById("password").minLength = signup ? 12 : 1;
  document.getElementById("submitBtn").textContent = signup ? "Create Account" : "Login";
  loginTab.classList.toggle("active", !signup);
  signupTab.classList.toggle("active", signup);
  msg.textContent = "";
}
loginTab.addEventListener("click", () => setMode("login"));
signupTab.addEventListener("click", () => setMode("signup"));

document.getElementById("showPassword").addEventListener("click", () => {
  const p = document.getElementById("password");
  p.type = p.type === "password" ? "text" : "password";
  document.getElementById("showPassword").textContent = p.type === "password" ? "Show" : "Hide";
});

form.addEventListener("submit", e => {
  if (mode === "signup" &&
      document.getElementById("password").value !== document.getElementById("confirmPassword").value) {
    e.preventDefault();
    msg.style.color = "#c62828";
    msg.textContent = "Passwords do not match.";
  }
});

document.getElementById("forgot").addEventListener("click", e => {
  e.preventDefault();
  msg.style.color = "#a65b18";
  msg.textContent = "Password reset needs a verified email-delivery flow. It is not enabled in this starter.";
});

const params = new URLSearchParams(location.search);
if (params.get("created") === "1") {
  msg.style.color = "#16803d";
  msg.textContent = "Account created successfully. Please log in.";
}
if (["email", "server", "otp_invalid", "otp_expired", "otp_locked", "csrf"].includes(params.get("error"))) {
  msg.style.color = "#c62828";
}
</script>
<% } %>
</body>
</html>
