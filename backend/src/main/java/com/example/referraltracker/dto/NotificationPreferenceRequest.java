package com.example.referraltracker.dto;

public class NotificationPreferenceRequest {
    private boolean email;
    private boolean sms;

    public NotificationPreferenceRequest() {}

    public NotificationPreferenceRequest(boolean email, boolean sms) {
        this.email = email;
        this.sms = sms;
    }

    public boolean isEmail() {
        return email;
    }

    public void setEmail(boolean email) {
        this.email = email;
    }

    public boolean isSms() {
        return sms;
    }

    public void setSms(boolean sms) {
        this.sms = sms;
    }
}
