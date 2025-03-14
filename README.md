# Rain Prediction Website

## Overview
This is a simple **Rain Prediction** website built using **AI** and **Machine Learning** techniques. The project predicts the possibility of rain based on current weather data, specifically using **temperature** and **humidity** as input features.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Python (Flask)
- **Machine Learning**: TensorFlow, Keras, scikit-learn, NumPy, pandas
- **Optimization Techniques**: BatchNormalization, LeakyReLU, ReduceLROnPlateau, Adam
- **Weather Data Source**: wttr.in

## Project Description
This project consists of two main components:
1. **Machine Learning Model**: 
   - The model is built using **TensorFlow** and optimized using techniques such as **BatchNormalization**, **LeakyReLU**, **ReduceLROnPlateau**, and the **Adam optimizer**.
   - The model is trained using weather data (temperature and humidity) and predicts the likelihood of rain.
   - The model’s accuracy ranges between **65% to 93.5%**, depending on the data.

2. **Web Application**:
   - The frontend is created using **React.js** for a responsive and interactive user interface.
   - The backend is built using **Python** and **Flask**, which handles the communication between the frontend and the weather data API (**wttr.in**).
   - **CORS** is used to enable cross-origin requests between the frontend and backend.

## Features
- Predicts the possibility of rain based on current weather data.
- User-friendly interface for displaying predictions.
- Real-time weather data fetched from **wttr.in**.

## Installation & Setup
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rain-prediction-website.git
