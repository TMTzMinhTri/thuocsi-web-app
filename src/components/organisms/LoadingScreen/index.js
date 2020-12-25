import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingScreen = () => (
  <div style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
    <CircularProgress size={40} thickness={4} value={100} variant="determinate" />
  </div>
);

export default LoadingScreen;
