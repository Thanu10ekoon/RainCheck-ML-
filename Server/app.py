from flask import Flask, jsonify
import numpy as np
import requests
from keras.models import load_model
from flask_cors import CORS
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)

# Load the trained model
model = load_model("rain_prediction_model.h5")

# Initialize the scaler (Use the same scaler that was used for training the model)
scaler = MinMaxScaler()

# Weather source (wttr.in)
CITY = "Colombo"  # Change this to your location
API_URL_WTTR = f"https://wttr.in/{CITY}?format=j1"

@app.route("/predict", methods=["GET"])
def predict():
    try:
        # Fetch real-time weather data from wttr.in
        response_wttr = requests.get(API_URL_WTTR)
        weather_data_wttr = response_wttr.json()

        if response_wttr.status_code != 200:
            return jsonify({"error": "Failed to fetch weather data from wttr.in"}), 500

        # Extract necessary data from wttr.in
        current_weather = weather_data_wttr.get("current_condition", [{}])[0]
        
        # Safely retrieve the data fields from wttr.in
        humidity = float(current_weather.get("humidity", 0))  # Humidity (%)
        temperature = float(current_weather.get("temp_C", 0))  # Temperature (°C)
        pressure = float(current_weather.get("pressure", 0))  # Pressure (hPa)
        wind_gusts = float(current_weather.get("windspeedKmph", 0))  # Wind Gusts (km/h)
        cloud_cover = float(current_weather.get("cloudcover", 0))  # Cloud Cover (%)
        
        # Calculate dew point using the formula: T_d = T - (100 - RH) / 5
        dew_point = temperature - (100 - humidity) / 5

        # Prepare input for the ML model
        user_input = np.array([[humidity, temperature, wind_gusts, cloud_cover, pressure, dew_point]])

        # Scale the input using the same scaler used for model training
        user_input_scaled = scaler.fit_transform(user_input)

        # Make prediction
        prediction = model.predict(user_input_scaled)[0][0]

        # Convert the prediction to a native Python float to avoid JSON serialization issues
        prediction = float(prediction)

        return jsonify({
            "humidity": humidity,
            "temperature": temperature,
            "wind_gusts": wind_gusts,
            "cloud_cover": cloud_cover,
            "pressure": pressure,
            "dew_point": round(dew_point, 2),  # Round dew point for readability
            "rain_probability": round(prediction, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
