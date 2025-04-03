import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const steps = [
  'Project Goals',
  'Brand Identity',
  'Content Structure',
  'Design Preferences',
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export function GuidedExperience({ builder, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleNext = async () => {
    setIsProcessing(true);
    try {
      await builder.handleUserInput(input);
      if (activeStep === steps.length - 1) {
        onComplete();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
        setInput('');
      }
    } catch (error) {
      console.error('Error processing input:', error);
    }
    setIsProcessing(false);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getCurrentPrompt = () => {
    switch (activeStep) {
      case 0:
        return "What kind of website are you looking to create? Tell me about your project's goals.";
      case 1:
        return "Let's talk about your brand. What feelings or emotions should your website convey?";
      case 2:
        return "What type of content will your website feature? Think about the main sections and pages.";
      case 3:
        return "What's your preferred visual style? Any specific colors, fonts, or design elements in mind?";
      default:
        return '';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          {steps[activeStep]}
        </Typography>
        
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {getCurrentPrompt()}
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response here..."
          disabled={isProcessing}
          sx={{ mb: 3 }}
        />

        {aiResponse && (
          <Typography color="primary" sx={{ mb: 3 }}>
            {aiResponse}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0 || isProcessing}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!input || isProcessing}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </StyledPaper>
    </Box>
  );
}