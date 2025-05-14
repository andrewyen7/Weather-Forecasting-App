import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import styled from 'styled-components';
import { formatTemperature, convertToFahrenheit, getWeatherIcon, formatDate } from '../utils/weatherUtils';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';

const ForecastSection = styled(Box)`
  margin: 32px 0 16px;
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(45deg, #00b4db, #0083b0);
    border-radius: 2px;
  }
`;

const ForecastContainer = styled(Box)`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 4px 24px;
  margin: 0 -4px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 180, 219, 0.5);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 180, 219, 0.7);
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: thin;
`;

const ForecastCard = styled(Card)`
  min-width: 160px;
  flex: 0 0 auto;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled(Box)`
  background: linear-gradient(45deg, #00b4db, #0083b0);
  color: white;
  padding: 12px;
  text-align: center;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
`;

const TemperatureText = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #00b4db, #0083b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 8px 0;
`;

const WeatherDescription = styled(Typography)`
  text-transform: capitalize;
  text-align: center;
  font-weight: 500;
`;

const InfoRow = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 4px;
  
  & svg {
    color: #00b4db;
    font-size: 16px;
    margin-right: 8px;
  }
`;

const Forecast = ({ forecast, unit }) => {
  const groupByDay = (forecastList) => {
    const groups = {};
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  };

  const getNoonForecast = (dayForecasts) => {
    return dayForecasts.find((forecast) => {
      const hour = new Date(forecast.dt * 1000).getHours();
      return hour >= 11 && hour <= 13;
    }) || dayForecasts[0];
  };

  const forecastGroups = groupByDay(forecast.list);
  const dailyForecasts = Object.values(forecastGroups).map(getNoonForecast);

  return (
    <ForecastSection>
      <SectionTitle variant="h5">5-Day Forecast</SectionTitle>
      <ForecastContainer>
        {dailyForecasts.map((dayForecast) => (
          <ForecastCard key={dayForecast.dt} elevation={0}>
            <CardHeader>
              <Typography variant="subtitle1" fontWeight="600">
                {formatDate(dayForecast.dt)}
              </Typography>
            </CardHeader>
            <CardContent>
              <WeatherIcon
                src={getWeatherIcon(dayForecast.weather[0].icon)}
                alt={dayForecast.weather[0].description}
              />
              
              <TemperatureText variant="h4">
                {formatTemperature(
                  unit === 'C' ? dayForecast.main.temp : convertToFahrenheit(dayForecast.main.temp),
                  unit
                )}
              </TemperatureText>
              
              <WeatherDescription variant="body2" color="text.secondary" gutterBottom>
                {dayForecast.weather[0].description}
              </WeatherDescription>
              
              <Divider sx={{ my: 1.5 }} />
              
              <InfoRow>
                <WaterDropIcon />
                <Typography variant="body2" color="text.secondary">
                  Humidity: <b>{dayForecast.main.humidity}%</b>
                </Typography>
              </InfoRow>
              
              <InfoRow>
                <AirIcon />
                <Typography variant="body2" color="text.secondary">
                  Wind: <b>{Math.round(dayForecast.wind.speed)} m/s</b>
                </Typography>
              </InfoRow>
            </CardContent>
          </ForecastCard>
        ))}
      </ForecastContainer>
    </ForecastSection>
  );
};

export default Forecast;
