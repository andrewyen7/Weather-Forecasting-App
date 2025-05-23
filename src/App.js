import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Paper } from '@mui/material';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeather, fetchForecast } from './services/weatherService';

const AppContainer = styled(Container)`
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppHeader = styled(Box)`
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
`;

const AppTitle = styled(Typography)`
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const AppSubtitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
`;

const ContentWrapper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  transition: all 0.3s ease;
`;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00b4db',
    },
    secondary: {
      main: '#2c5364',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
  },
});

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update time every minute
    
    return () => clearInterval(timer);
  }, []);

  // Simplified approach - no environment detection needed
  const handleSearch = async (query, isGeolocation = false) => {
    // Always clear error state at the beginning
    setLoading(true);
    setError(null);
    
    // Log for debugging
    console.log(`Search query: ${query}, isGeolocation: ${isGeolocation}`);
    
    try {
      // Fetch weather data
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(query),
        fetchForecast(query)
      ]);
      
      // Log success
      console.log('Weather data fetched successfully');
      
      // Update state with fetched data
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error(`Weather fetch error: ${err.message}`);
      
      // CRITICAL: Never show errors for geolocation requests
      if (!isGeolocation) {
        // Only show errors for manual city searches
        setError(err.message || 'Failed to fetch weather data');
      }
      
      // Clear weather data on error
      setWeather(null);
      setForecast(null);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer maxWidth="lg">
        <AppHeader>
          <AppTitle variant="h3">Weather Forecast</AppTitle>
          <AppSubtitle variant="subtitle1">
            {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </AppSubtitle>
        </AppHeader>
        
        <ContentWrapper elevation={0}>
          <SearchBar onSearch={handleSearch} />
          
          {loading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
          
          {weather && (
            <WeatherCard
              weather={weather}
              isCelsius={isCelsius}
              onUnitToggle={toggleUnit}
            />
          )}
          
          {forecast && (
            <Forecast
              forecast={forecast}
              unit={isCelsius ? 'C' : 'F'}
            />
          )}
        </ContentWrapper>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 