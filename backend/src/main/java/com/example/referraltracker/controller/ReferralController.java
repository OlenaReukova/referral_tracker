package com.example.referraltracker.controller;

import com.example.referraltracker.service.AuditLogService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
public class ReferralController {

    private final AuditLogService auditLogService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ReferralController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping(value = "/api/referrals", produces = MediaType.APPLICATION_JSON_VALUE)
    public byte[] getReferrals() throws IOException {
        auditLogService.logActivity("anonymous", "GET_REFERRALS", "/api/referrals", "Fetching all referrals");
        Resource resource = new ClassPathResource("referral_data.json");
        try (InputStream is = resource.getInputStream()) {
            return is.readAllBytes();
        }
    }

    @GetMapping(value = "/api/referrals/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JsonNode> getReferralById(@PathVariable String id) throws IOException {
        auditLogService.logActivity("anonymous", "GET_REFERRAL_BY_ID", "/api/referrals/" + id, "Fetching referral by id: " + id);
        Resource resource = new ClassPathResource("referral_data.json");
        try (InputStream is = resource.getInputStream()) {
            JsonNode root = objectMapper.readTree(is);
            JsonNode referrals = root.path("referrals");
            if (referrals.isArray()) {
                for (JsonNode referral : referrals) {
                    if (id.equals(referral.path("id").asText())) {
                        return ResponseEntity.ok(referral);
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
