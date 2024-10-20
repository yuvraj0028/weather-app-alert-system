# Weather Application & Alert System

## Overview

This weather application provides real-time weather updates using the [OpenWeather API](https://openweathermap.org/api). It updates every 5 minutes, displaying essential weather parameters like the main weather condition, temperature, perceived temperature (feels_like), and the time of the latest data update. The app monitors weather for six major metro cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad, and also allows users to search for specific locations or retrieve the current location for personalized weather data.

The application also summarizes daily weather and features an alert system that triggers emails if the temperature exceeds a user-defined range. Alerts are automatically checked every 15 minutes via a cron job in the backend.

## Features

- **Real-time** weather updates every 5 minutes.
- Displays key weather parameters:
  - **Main**: Main weather condition (e.g., Rain, Snow, Clear).
  - **Temperature** (°C): Current temperature in Celsius.
  - **Feels Like (°C)**: Perceived temperature in Celsius.
  - **Last Updated**: Time of the latest data update.
- **Location Support**:
  - **Metro Cities**: Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad.
  - **Current Location**: Automatically fetch weather for the user’s current location.
  - **Search Location**: Users can search for weather in any other location.
- **Daily Weather Summaries**: Provides a summary of the weather for the day.
- **Alert System**: Sends email notifications if the temperature exceeds a user-defined threshold.
  - Alerts are checked every 15 minutes using a backend cron job.
- **Email Notifications**: Integrates with Google Mail services using Java Mailer to send email alerts.
- **Logging, Validation, and Exception Handling**: Ensures error tracking, input validation, and robust system operations.

## Tech Stack

### Frontend

- **Angular** (Version 18)
- **Material UI**
- **Bootstrap**

### Weather API

- [**OpenWeather API**](https://openweathermap.org/api)

### Backend

- **Java** (Version 21)
- **Spring Boot**
- **MongoDB**
- **Java Mailer**
  - Google Mail services for sending email alerts.

## API Endpoints

1. **Create Alert**: Allows users to set an alert with a temperature threshold.

2. **Trigger Alert**: Backend checks the weather data and triggers an alert if the conditions meet the defined thresholds.

## Build Steps

### Prerequisites

1. Node.js and npm [Download](https://nodejs.org/en/download/package-manager)
2. Angular CLI (requires Node.js)

```bash
# run command
npm install -g @angular/cli
```

4. Java 21 (Java Development Kit) [Download](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
5. MongoDB [Download](https://www.mongodb.com/try/download/community)
6. Gradle [Download](https://gradle.org/install/)

7. Docker (optional for running MongoDB) - [Download Docker](https://docs.docker.com/get-docker/).

### MongoDB Setup via Docker

You can set up MongoDB using Docker with the following commands:

```bash
# Pull the MongoDB Docker image
docker pull mongo:latest

# Run the MongoDB container
docker run -d -p 27017:27017 --name=rule_engine mongo:latest

# Verify the state
docker ps
```

### Frontend Build Steps

1. Clone the repository::

```bash
git clone https://github.com/yuvraj0028/weather-app-alert-system.git
```

2. Navigate to the frontend directory:

```bash
cd weather-app-alert-system/weather_app_client
```

3. Install dependencies:

```bash
npm install
```

4. Run the frontend application:

```bash
npm start
```

The frontend will be accessible at `http://localhost:4200`.

### Backend Server Setup

1. Clone the repository::

```bash
git clone https://github.com/yuvraj0028/weather-app-alert-system.git
```

2. Navigate to the frontend directory:

```bash
cd weather-app-alert-system/weather_app_server/alert/alert
```

3. Install dependencies:

```bash
gradlew build
```

4. Run the backend application:

```bash
gradlew bootRun
```

The backend will be accessible at `http://localhost:9192`.

## Usage

- **Weather Data**: View real-time weather for metro cities, search for other locations, or get the current location's weather.
- **Set Alerts**: Create a new alert by specifying the temperature range.
- **Receive Alerts**: Automatically receive an email notification if the temperature crosses the user-defined threshold.

## Future Enhancements

- Add more cities and refine the alert system.
- Enable users to set alerts for additional weather conditions (e.g., humidity, wind speed).
