package com.example.referraltracker.controller;

import com.example.referraltracker.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.io.InputStream;

@RestController
public class ReferralController {

    private final AuditLogService auditLogService;

    @Autowired
    public ReferralController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping(value = "/api/referrals/{referralId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public byte[] getReferralById(@PathVariable String referralId) throws IOException {
        auditLogService.logActivity("anonymous", "GET_REFERRAL", "/api/referrals/" + referralId, "Fetching referral by id");
        Resource resource = new ClassPathResource("referral_data.json");
        try (InputStream is = resource.getInputStream()) {
            return is.readAllBytes();
        }
    }
}
