import React, { useState } from 'react';
import { TextField, IconButton, Box, InputAdornment, Paper, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components';

const SearchContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const SearchField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &:hover, &.Mui-focused {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    & fieldset {
      border-color: transparent;
    }
    
    &:hover fieldset, &.Mui-focused fieldset {
      border-color: #00b4db !important;
    }
  }
  
  & .MuiInputBase-input {
    padding: 14px 20px;
  }
`;

const SearchButton = styled(IconButton)`
  background: linear-gradient(45deg, #00b4db, #0083b0);
  color: white;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #0083b0, #00b4db);
    box-shadow: 0 4px 12px rgba(0, 131, 176, 0.4);
  }
  
  &.Mui-disabled {
    background: #e0e0e0;
  }
`;

const LocationButton = styled(IconButton)`
  color: #00b4db;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
`;

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };
  
  // Use state to track geolocation status
  const [geoStatus, setGeoStatus] = useState('idle');

  const handleLocationClick = () => {
    // Prevent multiple clicks while processing
    if (geoStatus === 'loading') return;
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Please enter a city name.");
      return;
    }
    
    // Set loading state
    setGeoStatus('loading');
    
    // Define options for better compatibility
    const options = {
      enableHighAccuracy: false,  // Don't need high accuracy for weather
      timeout: 7000,             // Shorter timeout for better UX
      maximumAge: 0              // Don't use cached position
    };
    
    try {
      // Request geolocation with proper options
      navigator.geolocation.getCurrentPosition(
        // Success handler
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`Location found: ${lat},${lon}`);
          
          // Use the coordinates to search for weather
          onSearch(`${lat},${lon}`, true);
          setGeoStatus('success');
        },
        // Error handler
        (error) => {
          console.error("Geolocation error:", error.code, error.message);
          
          // Handle different error types
          switch(error.code) {
            case error.PERMISSION_DENIED:
              // User denied permission
              alert("Location access was denied. Please enter a city name manually.");
              break;
            case error.POSITION_UNAVAILABLE:
              // Position unavailable
              alert("Location information is unavailable. Please enter a city name.");
              break;
            case error.TIMEOUT:
              // Timeout
              alert("Location request timed out. Please enter a city name.");
              break;
            default:
              // Other errors
              alert("An unknown error occurred getting your location. Please enter a city name.");
          }
          
          setGeoStatus('error');
        },
        options
      );
    } catch (e) {
      // Handle any exceptions
      console.error("Exception in geolocation:", e);
      alert("Unable to access location services. Please enter a city name.");
      setGeoStatus('error');
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchField
          fullWidth
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          InputProps={{
            startAdornment: (
              <Tooltip title="Use current location">
                <LocationButton onClick={handleLocationClick} size="small">
                  <LocationOnIcon />
                </LocationButton>
              </Tooltip>
            ),
          }}
        />
        <Tooltip title="Search weather">
          <SearchButton
            type="submit"
            aria-label="search"
            disabled={!city.trim()}
            size="large"
          >
            <SearchIcon />
          </SearchButton>
        </Tooltip>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;
