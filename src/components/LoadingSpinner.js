import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import styled from 'styled-components';

const SpinnerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 40px 0;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: #00b4db;
  margin-bottom: 16px;
  animation: pulse 1.5s ease-in-out infinite;
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const LoadingText = styled(Typography)`
  color: #00b4db;
  font-weight: 500;
  letter-spacing: 1px;
  animation: fadeInOut 1.5s ease-in-out infinite;
  
  @keyframes fadeInOut {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <StyledCircularProgress size={70} thickness={4} />
      <LoadingText variant="h6">Loading weather data...</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 