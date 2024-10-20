package com.weather.alert.component;

import com.weather.alert.model.AlertModel;
import com.weather.alert.model.WeatherModel;
import com.weather.alert.service.AlertService;
import com.weather.alert.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class ScheduleEmail {
    @Autowired
    private EmailService emailService;

    @Autowired
    private AlertService alertService;

    // scheduling every 15 minutes
    @Scheduled(cron = "0 0/15 * * * *")
    public void execute(){
        try {
            log.info("Fetching all alerts");
            List<AlertModel> alerts = alertService.getAlerts();
            for (AlertModel alert : alerts) {
                Double maxTemp = alert.getMaxTemp();
                Double minTemp = alert.getMinTemp();
                String city = alert.getCity();
                Double lat = alert.getLat();
                Double lon = alert.getLon();
                String email = alert.getEmail();
                String units = alert.getUnit();

                // calling open weather API
                log.info("Calling Open Weather API");

                WeatherModel weatherModel = alertService.getWeather(lat, lon, units);
                Double currTemp = weatherModel.getMain().getTemp();

                if(units.equals("metric")){
                    units = "C";
                } else {
                    units = "K";
                }

                if(currTemp > maxTemp){
                    emailService.sendEmail(email,"Weather Alert","The Current temperature of " + city + " is " + currTemp + " °" +  units + " which is greater than the expected temperature " + maxTemp + " °" +  units);
                } else if(currTemp < minTemp){
                    emailService.sendEmail(email,"Weather Alert","The Current temperature of " + city + " is " + currTemp + " °" +  units +" which is less than the expected temperature " + minTemp + " °" +  units);
                } else {
                    emailService.sendEmail(email,"Weather Alert","The Current temperature of " + city + " is " + currTemp + " °" +  units + " which is between the expected temperature " + minTemp + " °" +  units + " and " + maxTemp + " °" +  units);
                }


                log.info("record executed successfully : {}", alert);
            }
        } catch (Exception e){
            log.error("Error while fetching alerts: {}", e.getMessage());
        }
    }

}
