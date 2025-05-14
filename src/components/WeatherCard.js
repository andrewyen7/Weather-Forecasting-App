import React from 'react';
import { Card, CardContent, Typography, Box, Switch, FormControlLabel, Grid, Divider, Chip } from '@mui/material';
import styled from 'styled-components';
import { formatTemperature, convertToFahrenheit, getWeatherIcon } from '../utils/weatherUtils';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const WeatherCardContainer = styled(Card)`
  margin: 20px auto;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const LocationBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const WeatherIcon = styled.img`
  width: 120px;
  height: 120px;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const TemperatureText = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #00b4db, #0083b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 16px;
`;

const WeatherDescription = styled(Typography)`
  text-transform: capitalize;
  font-weight: 500;
`;

const UnitSwitch = styled(FormControlLabel)`
  margin-left: auto;
  
  & .MuiSwitch-root {
    margin-right: 8px;
  }
  
  & .MuiSwitch-track {
    background-color: ${props => props.checked ? '#00b4db' : '#90caf9'};
  }
`;

const WeatherInfoGrid = styled(Grid)`
  margin-top: 24px;
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 180, 219, 0.05);
  height: 100%;
  
  & svg {
    color: #00b4db;
    margin-right: 12px;
    font-size: 24px;
  }
`;

const SunriseSunsetBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const TimeChip = styled(Chip)`
  background: linear-gradient(45deg, #00b4db, #0083b0);
  color: white;
  font-weight: 500;
  margin-top: 4px;
`;

const WeatherCard = ({ weather, isCelsius, onUnitToggle }) => {
  if (!weather) return null;
  
  // Format sunrise and sunset times
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const sunrise = formatTime(weather.sys.sunrise);
  const sunset = formatTime(weather.sys.sunset);

  return (
    <WeatherCardContainer elevation={0}>
      <CardContent>
        <LocationBox>
          <LocationOnIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2" fontWeight="600">
            {weather.name}, {weather.sys.country}
          </Typography>
          
          <UnitSwitch
            control={
              <Switch
                checked={!isCelsius}
                onChange={onUnitToggle}
                color="primary"
              />
            }
            label={isCelsius ? "°C" : "°F"}
            checked={!isCelsius}
          />
        </LocationBox>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <TemperatureText variant="h1">
                {formatTemperature(
                  isCelsius ? weather.main.temp : convertToFahrenheit(weather.main.temp),
                  isCelsius ? 'C' : 'F'
                )}
              </TemperatureText>
              <Box>
                <WeatherDescription variant="h6">
                  {weather.weather[0].description}
                </WeatherDescription>
                <Typography variant="body2" color="text.secondary">
                  Feels like {formatTemperature(
                    isCelsius ? weather.main.feels_like : convertToFahrenheit(weather.main.feels_like),
                    isCelsius ? 'C' : 'F'
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WeatherIcon
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
          </Grid>
        </Grid>
        
        <WeatherInfoGrid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <InfoItem>
              <ThermostatIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">Min/Max</Typography>
                <Typography variant="body1" fontWeight="500">
                  {formatTemperature(
                    isCelsius ? weather.main.temp_min : convertToFahrenheit(weather.main.temp_min),
                    isCelsius ? 'C' : 'F'
                  )} / {formatTemperature(
                    isCelsius ? weather.main.temp_max : convertToFahrenheit(weather.main.temp_max),
                    isCelsius ? 'C' : 'F'
                  )}
                </Typography>
              </Box>
            </InfoItem>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <InfoItem>
              <WaterDropIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">Humidity</Typography>
                <Typography variant="body1" fontWeight="500">{weather.main.humidity}%</Typography>
              </Box>
            </InfoItem>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <InfoItem>
              <AirIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">Wind</Typography>
                <Typography variant="body1" fontWeight="500">{weather.wind.speed} m/s</Typography>
              </Box>
            </InfoItem>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <InfoItem>
              <CompressIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">Pressure</Typography>
                <Typography variant="body1" fontWeight="500">{weather.main.pressure} hPa</Typography>
              </Box>
            </InfoItem>
          </Grid>
        </WeatherInfoGrid>
        
        <SunriseSunsetBox>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Sunrise</Typography>
            <TimeChip label={sunrise} size="small" />
          </Box>
          
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Sunset</Typography>
            <TimeChip label={sunset} size="small" />
          </Box>
        </SunriseSunsetBox>
      </CardContent>
    </WeatherCardContainer>
  );
};

export default WeatherCard; 