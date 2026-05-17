package com.blackhorsepub.BlackHorse_backend;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final String adminUsername;
    private final String adminPassword;
    private final String secret;

    public AuthService(
            @Value("${app.admin.username}") String adminUsername,
            @Value("${app.admin.password}") String adminPassword,
            @Value("${app.jwt.secret}") String secret) {
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
        this.secret = secret;
    }

    public String login(LoginRequest request) {
        if (!adminUsername.equals(request.username()) || !adminPassword.equals(request.password())) {
            throw new IllegalArgumentException("Invalid admin credentials");
        }
        long expiresAt = Instant.now().plusSeconds(60 * 60 * 8).getEpochSecond();
        String payload = request.username() + ":" + expiresAt;
        return Base64.getUrlEncoder().withoutPadding().encodeToString(payload.getBytes(StandardCharsets.UTF_8))
                + "."
                + sign(payload);
    }

    public boolean isValid(String token) {
        if (token == null || !token.contains(".")) {
            return false;
        }
        String[] parts = token.split("\\.", 2);
        String payload = new String(Base64.getUrlDecoder().decode(parts[0]), StandardCharsets.UTF_8);
        String[] values = payload.split(":", 2);
        if (values.length != 2 || !adminUsername.equals(values[0])) {
            return false;
        }
        long expiresAt = Long.parseLong(values[1]);
        return expiresAt > Instant.now().getEpochSecond() && sign(payload).equals(parts[1]);
    }

    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to sign token", ex);
        }
    }
}
