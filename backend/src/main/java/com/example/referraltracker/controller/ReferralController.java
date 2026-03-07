package com.example.referraltracker.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
public class ReferralController {

    @GetMapping(value = "/api/referrals", produces = MediaType.APPLICATION_JSON_VALUE)
    public byte[] getReferrals() throws IOException {
        Resource resource = new ClassPathResource("referral_data.json");
        try (InputStream is = resource.getInputStream()) {
            return is.readAllBytes();
        }
    }
}
