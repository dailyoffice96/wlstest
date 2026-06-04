package com.backend_semi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey = Jwts.SIG.HS256.key().build();
    private final long expiration = 3600000;

    public String createAccessToken(Long memberId, String loginId, String name) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .subject(String.valueOf(memberId))
                .claim("loginId", loginId)
                .claim("name", name)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Long getMemberId(String token) {
        return Long.valueOf(parseToken(token).getSubject());
    }

    public String getLoginId(String token) {
        return parseToken(token).get("loginId", String.class);
    }

    public String getName(String token) {
        return parseToken(token).get("name", String.class);
    }
}