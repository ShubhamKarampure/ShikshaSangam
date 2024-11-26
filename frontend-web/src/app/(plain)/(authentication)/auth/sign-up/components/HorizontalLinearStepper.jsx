import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import StudentForm from "./SpecificForm/StudentForm";
import AlumniForm from "./SpecificForm/AlumniForm";
import AdminForm from "./SpecificForm/AdminForm";
import { set } from "react-hook-form";
import useSignUpPageContext from "@/context/useSignUpPageContext";

const steps = ["General", "Specific"];

export default function HorizontalLinearStepper() {
  const {activeStep, setActiveStep} = useSignUpPageContext();
  const navigate = useNavigate();
  const [children, setChildren] = React.useState([
    <div>
      <SignUpForm key={React.useId()} activeStep={activeStep} setActiveStep={setActiveStep}/>
    </div>,
    <div>
      <StudentForm key={React.useId()}/>
    </div>,
  ]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        borderRadius: "8px",
        color: "#fff",
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                ".MuiStepLabel-label": {
                  color: activeStep >= steps.indexOf(label) ? "#ffffff" : "#aaaaaa",
                },
                ".MuiStepIcon-root": {
                  color: activeStep >= steps.indexOf(label) ? "#1976d2" : "#aaaaaa",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? navigate('/') : (
        <>
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>{children[activeStep]}</Box>
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, color: "#ffffff" }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </React.Fragment>
        </>
      )}
    </Box>
  );
}
