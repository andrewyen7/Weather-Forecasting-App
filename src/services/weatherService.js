import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

// Helper function to determine if the input is coordinates or a city name
const isCoordinates = (input) => {
  // Check if the input matches the pattern "latitude,longitude"
  return /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(input);
};

// Debug function to log API requests
const logApiRequest = (endpoint, params) => {
  console.log(`API Request to ${endpoint}:`, params);
};

export const fetchWeather = async (query) => {
  try {
    let params = {};
    
    if (isCoordinates(query)) {
      // If coordinates, split into lat and lon and use them correctly
      const [lat, lon] = query.split(',').map(coord => parseFloat(coord.trim()));
      // Make sure we're passing valid numbers
      if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Invalid coordinates format');
      }
      params = { lat, lon };
    } else {
      // Otherwise, treat as city name
      params = { q: query };
    }
    
    // Log the request for debugging
    logApiRequest('/weather', params);
    
    const response = await weatherApi.get('/weather', { params });
    return response.data;
  } catch (error) {
    console.error('Weather API error:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch weather data');
    }
    throw new Error('Network error');
  }
};

export const fetchForecast = async (query) => {
  try {
    let params = {};
    
    if (isCoordinates(query)) {
      // If coordinates, split into lat and lon and use them correctly
      const [lat, lon] = query.split(',').map(coord => parseFloat(coord.trim()));
      // Make sure we're passing valid numbers
      if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Invalid coordinates format');
      }
      params = { lat, lon };
    } else {
      // Otherwise, treat as city name
      params = { q: query };
    }
    
    // Log the request for debugging
    logApiRequest('/forecast', params);
    
    const response = await weatherApi.get('/forecast', { params });
    return response.data;
  } catch (error) {
    console.error('Forecast API error:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch forecast data');
    }
    throw new Error('Network error');
  }
}; 