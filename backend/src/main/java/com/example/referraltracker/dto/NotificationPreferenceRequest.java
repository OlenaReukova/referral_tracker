package com.example.referraltracker.dto;

public class NotificationPreferenceRequest {
    private boolean emailEnabled;
    private String email;
    private boolean smsEnabled;
    private String sms;

    public NotificationPreferenceRequest() {}

    public NotificationPreferenceRequest(boolean emailEnabled, String email, boolean smsEnabled, String sms) {
        this.emailEnabled = emailEnabled;
        this.email = email;
        this.smsEnabled = smsEnabled;
        this.sms = sms;
    }

    public boolean isEmailEnabled() {
        return emailEnabled;
    }

    public void setEmailEnabled(boolean emailEnabled) {
        this.emailEnabled = emailEnabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isSmsEnabled() {
        return smsEnabled;
    }

    public void setSmsEnabled(boolean smsEnabled) {
        this.smsEnabled = smsEnabled;
    }

    public String getSms() {
        return sms;
    }

    public void setSms(String sms) {
        this.sms = sms;
    }
}
