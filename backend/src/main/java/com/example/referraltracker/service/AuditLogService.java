package com.example.referraltracker.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {

    private static final Logger auditLogger = LoggerFactory.getLogger("AUDIT_LOG");

    public void logActivity(String username, String action, String resource, String details) {
        String logMessage = String.format("[%s] User: %s | Action: %s | Resource: %s | Details: %s",
                LocalDateTime.now(), username, action, resource, details);
        auditLogger.info(logMessage);
    }
}
