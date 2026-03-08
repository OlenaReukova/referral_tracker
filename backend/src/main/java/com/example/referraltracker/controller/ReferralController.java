package com.example.referraltracker.controller;

import com.example.referraltracker.dto.NotificationPreferenceRequest;
import com.example.referraltracker.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

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

    @PostMapping(value = "/api/referrals/{referralId}/preferences", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveNotificationPreferences(
            @PathVariable String referralId,
            @RequestBody NotificationPreferenceRequest request) {

        String details = String.format("Preference: %s, Value: %s",
                request.getPreference(), request.getContactValue());

        auditLogService.logActivity("anonymous", "SAVE_PREFERENCES",
                "/api/referrals/" + referralId + "/preferences", details);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Preferences saved successfully", "referralId", referralId));
    }
}
