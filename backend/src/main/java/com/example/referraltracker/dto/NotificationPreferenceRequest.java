package com.example.referraltracker.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationPreferenceRequest {
    private String preference; // "EMAIL" or "SMS"
    private String contactValue; // the actual email or phone number
}
