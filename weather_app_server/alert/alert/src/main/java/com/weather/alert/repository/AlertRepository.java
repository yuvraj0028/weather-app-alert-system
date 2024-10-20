package com.weather.alert.repository;

import com.weather.alert.model.AlertModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends MongoRepository<AlertModel, String> {
}
