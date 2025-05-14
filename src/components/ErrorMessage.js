import React from 'react';
import { Alert, AlertTitle, Box, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorContainer = styled(Box)`
  max-width: 600px;
  margin: 30px auto;
  text-align: center;
`;

const ErrorCard = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 4px solid #f44336;
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  color: #f44336;
  font-size: 60px;
  margin-bottom: 16px;
`;

const ErrorTitle = styled(Typography)`
  color: #f44336;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ErrorText = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
  max-width: 400px;
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorCard elevation={0}>
        <ErrorIcon />
        <ErrorTitle variant="h5">Unable to Load Weather Data</ErrorTitle>
        <ErrorText variant="body1">{message}</ErrorText>
      </ErrorCard>
    </ErrorContainer>
  );
};

export default ErrorMessage; 