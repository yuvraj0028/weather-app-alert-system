package com.weather.alert.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {
    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String toEmail, String subject, String message) {
        try{
            log.info("Sending email to {} with subject {} and message {}", toEmail, subject, message);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(toEmail);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            javaMailSender.send(mailMessage);
            log.info("Email sent successfully");
        } catch (Exception e) {
            log.error("Error while sending email: {}", e.getMessage());
            throw e;
        }
    }
}
