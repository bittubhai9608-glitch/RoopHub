package in.roophub.auth;

import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.HexFormat;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public final class OtpUtil {
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String SECRET_ENV = "ROOPHUB_OTP_SECRET";

    private OtpUtil() {}

    public static String generate() {
        return "%06d".formatted(RANDOM.nextInt(1_000_000));
    }

    public static String hash(String code) throws GeneralSecurityException {
        String secret = System.getenv(SECRET_ENV);
        if (secret == null || secret.length() < 32) {
            throw new IllegalStateException(SECRET_ENV + " must contain at least 32 characters.");
        }
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return HexFormat.of().formatHex(mac.doFinal(code.getBytes(StandardCharsets.UTF_8)));
    }
}
