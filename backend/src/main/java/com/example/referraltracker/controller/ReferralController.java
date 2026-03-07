package com.example.referraltracker.controller;

import com.example.referraltracker.exception.ResourceNotFoundException;
import com.example.referraltracker.service.AuditLogService;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.Pattern;
import java.io.IOException;
import java.io.InputStream;

@RestController
@Validated
public class ReferralController {

    private final AuditLogService auditLogService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ReferralController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping(value = "/api/referrals", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JsonNode> getReferrals() {
        auditLogService.logActivity("anonymous", "GET_REFERRALS", "/api/referrals", "Fetching all referrals");
        Resource resource = new ClassPathResource("referral_data.json");
        try (InputStream is = resource.getInputStream()) {
            JsonNode root = objectMapper.readTree(is);
            JsonNode referrals = root.path("referrals");
            return ResponseEntity.ok(referrals);
        } catch (IOException e) {
            throw new RuntimeException("Error reading referral data file", e);
        }
    }

    @GetMapping(value = "/api/referrals/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JsonNode> getReferralById(@PathVariable @Pattern(regexp = "^ref\\d+$", message = "Invalid referral ID format") String id) {
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
        } catch (IOException e) {
            throw new RuntimeException("Error reading referral data file", e);
        }
        throw new ResourceNotFoundException("Referral not found with id: " + id);
    }
}
