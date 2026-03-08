package com.example.referraltracker.controller;

import com.example.referraltracker.dto.NotificationPreferenceRequest;
import com.example.referraltracker.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
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

    @PostMapping(value = "/api/referrals/{referralId}/notification-preferences", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateNotificationPreferences(
            @PathVariable String referralId,
            @RequestBody NotificationPreferenceRequest request) {

        String details = String.format("Email: %b, SMS: %b", request.isEmail(), request.isSms());
        auditLogService.logActivity("anonymous", "UPDATE_NOTIFICATION_PREFERENCES",
                "/api/referrals/" + referralId + "/notification-preferences", details);

        return ResponseEntity.ok().body(Map.of(
                "status", "success",
                "message", "Notification preferences updated successfully"
        ));
    }
}
