package com.weather.alert.service;

public interface EmailService {
    public void sendEmail(String toEmail, String subject, String body);
}
