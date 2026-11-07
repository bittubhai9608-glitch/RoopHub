package in.roophub.auth;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public final class MailUtil {
    private MailUtil() {}

    public static void sendSignupOtp(String recipient, String name, String code) throws Exception {
        String host = required("ROOPHUB_SMTP_HOST");
        String port = required("ROOPHUB_SMTP_PORT");
        String username = required("ROOPHUB_SMTP_USER");
        String password = required("ROOPHUB_SMTP_PASSWORD");
        String from = required("ROOPHUB_SMTP_FROM");

        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.starttls.required", "true");
        properties.put("mail.smtp.connectiontimeout", "10000");
        properties.put("mail.smtp.timeout", "10000");
        properties.put("mail.smtp.writetimeout", "10000");

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
        message.setSubject("Your RoopHub signup verification code", StandardCharsets.UTF_8.name());
        message.setText("Hello " + name + ",\n\nYour RoopHub verification code is " + code
                + ". It expires in 10 minutes. Do not share this code with anyone.\n\nRoopHub",
                StandardCharsets.UTF_8.name());
        Transport.send(message);
    }

    private static String required(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(name + " is not configured.");
        }
        return value;
    }
}
