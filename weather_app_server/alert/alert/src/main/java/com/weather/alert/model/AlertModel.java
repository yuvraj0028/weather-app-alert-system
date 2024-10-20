package com.weather.alert.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@ToString
public class AlertModel {
    @Id
    private String id;
    private Double lat;
    private Double lon;
    private Double minTemp;
    private Double maxTemp;
    private String email;
    private String city;
    private String unit;
}
