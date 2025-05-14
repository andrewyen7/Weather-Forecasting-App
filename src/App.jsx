import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeather, fetchForecast } from './services/weatherService';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0083b0',
    },
    secondary: {
      main: '#00b4db',
    },
  },
});

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <SearchBar onSearch={handleSearch} />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard weather={weather} isCelsius={isCelsius} onUnitToggle={toggleUnit} />}
        {forecast && <Forecast forecast={forecast} isCelsius={isCelsius} />}
      </Container>
    </ThemeProvider>
  );
}

export default App; 