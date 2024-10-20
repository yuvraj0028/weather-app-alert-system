package com.weather.alert.service;

import com.weather.alert.model.AlertModel;
import com.weather.alert.model.WeatherModel;
import com.weather.alert.repository.AlertRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Slf4j
public class AlertServiceImpl implements AlertService{
    @Autowired
    private AlertRepository alertRepository;

    @Value("${weather.api}")
    private String weatherAPI;

    @Value("${weather.url}")
    private String weatherURL;

    @Autowired
    private EmailService emailService;

    @Override
    public String createAlert(AlertModel alertModel) {
        try{
            // data validation
            if(!validateData(alertModel)){
                throw new Exception("Invalid data");
            }
            alertModel.setEmail(alertModel.getEmail().trim());
            alertRepository.save(alertModel);
            log.info("Alert created successfully");
            return "SUCCESS";
        } catch (Exception e){
             log.error("Error while creating alert: {}", e.getMessage());
             return "ERROR";
        }
    }

    @Override
    public List<AlertModel> getAlerts(){
        try {
            log.info("Fetching all alerts");
            List<AlertModel> alerts = alertRepository.findAll();
            log.info("Alerts fetched successfully");
            return alerts;
        } catch (Exception e){
            log.error("Error while fetching alerts: {}", e.getMessage());
            throw e;
        }
    }

    @Override
    public WeatherModel getWeather(Double lat, Double lon, String units){
        RestTemplate restTemplate = new RestTemplate();
        WeatherModel weatherModel;
        try{
            log.info("Calling Open Weather API");
            weatherModel = restTemplate.getForObject(weatherURL, WeatherModel.class, lat, lon,weatherAPI, units);
            log.info("Weather API called successfully");
            return weatherModel;
        } catch (Exception e){
            log.error("Error while calling Open Weather API: {}", e.getMessage());
            throw e;
        }
    }

    @Override
    public String triggerAlert(String email){
        boolean alertFound = false;
        try{
            List<AlertModel> alertModel = getAlerts();
            for(AlertModel alert : alertModel){
                if(alert.getEmail().equals(email)){
                    alertFound = true;

                    WeatherModel weatherModel = getWeather(alert.getLat(), alert.getLon(), alert.getUnit());
                    Double currTemp = weatherModel.getMain().getTemp();

                    Double maxTemp = alert.getMaxTemp();
                    Double minTemp = alert.getMinTemp();

                    String city = alert.getCity();
                    String units = alert.getUnit();
                    if(units.equals("metric")){
                        units = "C";
                    } else {
                        units = "K";
                    }

                    if(currTemp > alert.getMaxTemp()){
                        emailService.sendEmail(email,"Weather Alert","The Current temperature of " + city + " is " + currTemp + " °" +  units + " which is greater than the expected temperature " + maxTemp + " °" +  units);
                    } else if (currTemp < alert.getMinTemp()){
                        emailService.sendEmail(email,"Weather Alert","The Current temperature of " + city + " is " + currTemp + " °" +  units +" which is less than the expected temperature " + minTemp + " °" +  units);
                    } else {
                        emailService.sendEmail(email,"Weather Alert","The Current temperature of " + city + " is " + currTemp + " °" +  units + " which is between the expected temperature " + minTemp + " °" +  units + " and " + maxTemp + " °" +  units);
                    }
                }
            }

            if(!alertFound){
                log.error("No alert found for email {}", email);
                throw new Exception("No alert found for email " + email);
            }

            log.info("Alert triggered successfully");
            return "SUCCESS";

        } catch (Exception e){
            log.error("Error while triggering alert: {}", e.getMessage());
            return e.getMessage();
        }
    }

    private boolean validateData(AlertModel alertModel){
        // if values are null
        if(alertModel.getLat() == null || alertModel.getLon() == null || alertModel.getMinTemp() == null || alertModel.getMaxTemp() == null || alertModel.getEmail() == null || alertModel.getEmail().trim().isEmpty()){
            return false;
        }

        // if max temp is less than min temp
        if(alertModel.getMaxTemp() < alertModel.getMinTemp()){
            return false;
        }

        // if email is not valid
        if(!alertModel.getEmail().matches("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$")){
            return false;
        }

        return true;
    }
}
