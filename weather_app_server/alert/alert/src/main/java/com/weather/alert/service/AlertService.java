package com.weather.alert.service;

import com.weather.alert.model.AlertModel;
import com.weather.alert.model.WeatherModel;

import java.util.List;

public interface AlertService {
    public String createAlert(AlertModel alertModel);

    public List<AlertModel> getAlerts();

    public WeatherModel getWeather(Double lat, Double lon, String units);

    public String triggerAlert(String email);
}
