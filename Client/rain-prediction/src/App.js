import React, { useState, useEffect } from "react";
import "./index.css"; // Import the CSS file

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
    const interval = setInterval(fetchPrediction, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🌦 Live Rain Prediction</h1>

        {weatherData ? (
          weatherData.error ? (
            <p className="result">⚠️ {weatherData.error}</p>
          ) : (
            <>
              <p className="data-text">🌡 Temperature: {weatherData.temperature}°C</p>
              <p className="data-text">💧 Humidity: {weatherData.humidity}%</p>
              <p className="data-text">🌬 Wind Gusts: {weatherData.wind_gusts} km/h</p>
              <p className="data-text">☁ Cloud Cover: {weatherData.cloud_cover}%</p>
              <p className="data-text">⏲ Pressure: {weatherData.pressure} hPa</p>
              <p className="data-text">❄ Dew Point: {weatherData.dew_point}°C</p>

              <p className="result">
                {weatherData.rain_probability > 0.5
                  ? `🌧 High Possibility of Rain (${weatherData.rain_probability})`
                  : `☀ Low Possibility of Rain (${weatherData.rain_probability})`}
              </p>
            </>
          )
        ) : (
          <p className="result">⏳ Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
