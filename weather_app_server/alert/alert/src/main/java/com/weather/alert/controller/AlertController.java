package com.weather.alert.controller;

import com.weather.alert.model.AlertModel;
import com.weather.alert.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(
        origins = {
                "http://localhost:4200",
        },
        methods = {
                RequestMethod.POST,
        }
)
@RestController
@RequestMapping("/api/alert")
public class AlertController {
    @Autowired
    private AlertService alertService;

    @PostMapping(value = "/create", produces = "application/json", consumes = "application/json")
    public String createAlert(@RequestBody AlertModel alertModel){
        return alertService.createAlert(alertModel);
    }

    @PostMapping(value="/trigger", produces = "application/json", consumes = "application/json")
    public String triggerAlert(@RequestBody Map<String,String> email){
        return alertService.triggerAlert(email.get("email"));
    }
}
