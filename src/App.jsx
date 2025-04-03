import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import { GuidedExperience } from './components/GuidedExperience';
import { Builder } from './components/Builder';
import SiteBuilder from './index';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [builder, setBuilder] = useState(null);
  const [currentStep, setCurrentStep] = useState('guided');

  useEffect(() => {
    const initializeBuilder = async () => {
      try {
        const siteBuilder = new SiteBuilder();
        await siteBuilder.initialize();
        setBuilder(siteBuilder);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize builder:', error);
        // Handle error appropriately
      }
    };

    initializeBuilder();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      {currentStep === 'guided' ? (
        <GuidedExperience
          builder={builder}
          onComplete={() => setCurrentStep('builder')}
        />
      ) : (
        <Builder builder={builder} />
      )}
    </Container>
  );
}

export default App;