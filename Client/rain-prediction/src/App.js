import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  font-family: "Poppins", sans-serif;
  color: white;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const DataText = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

const Result = styled.p`
  font-size: 1.4rem;
  margin-top: 20px;
  font-weight: bold;
`;

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict");
      const data = await response.json();
      console.log("Weather Data:", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setWeatherData({ error: "Failed to fetch prediction" });
    }
  };

  useEffect(() => {
    fetchPrediction();
    const interval = setInterval(fetchPrediction, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Card>
        <Title>🌦 Live Rain Prediction</Title>

        {weatherData ? (
          weatherData.error ? (
            <Result>⚠️ {weatherData.error}</Result>
          ) : (
            <>
              <DataText>🌡 Temperature: {weatherData.temperature}°C</DataText>
              <DataText>💧 Humidity: {weatherData.humidity}%</DataText>
              <DataText>🌬 Wind Gusts: {weatherData.wind_gusts} km/h</DataText>
              <DataText>☁ Cloud Cover: {weatherData.cloud_cover}%</DataText>
              <DataText>⏲ Pressure: {weatherData.pressure} hPa</DataText>
              <DataText>❄ Dew Point: {weatherData.dew_point}°C</DataText>

              <Result>
                {weatherData.rain_probability > 0.5
                  ? `🌧 High Possibility of Rain (${weatherData.rain_probability})`
                  : `☀ Low Possibility of Rain (${weatherData.rain_probability})`}
              </Result>
            </>
          )
        ) : (
          <Result>⏳ Loading...</Result>
        )}
      </Card>
    </Container>
  );
};

export default App;
