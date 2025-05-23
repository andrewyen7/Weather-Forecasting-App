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
  
  // Improved geolocation handling with proper coordinate formatting
  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }
    
    // Better options for more reliable results
    const options = {
      enableHighAccuracy: true, // Try to get the best possible location
      timeout: 10000,
      maximumAge: 0
    };
    
    // Use a simple approach with no alerts
    navigator.geolocation.getCurrentPosition(
      // Success handler with proper coordinate formatting
      (position) => {
        // Get coordinates with proper precision (5 decimal places is sufficient for weather)
        const lat = position.coords.latitude.toFixed(5);
        const lon = position.coords.longitude.toFixed(5);
        
        // Log for debugging
        console.log(`Location found: ${lat},${lon}`);
        
        // Format coordinates properly for the API
        const coordString = `${lat},${lon}`;
        console.log(`Sending coordinates: ${coordString}`);
        
        // Pass to search function
        onSearch(coordString, true);
      },
      // Error handler - just log errors, no alerts
      (error) => {
        console.error("Geolocation error:", error.code, error.message);
      },
      options
    );
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
