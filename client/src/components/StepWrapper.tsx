import {
  Card,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  stepClasses,
} from "@mui/material";
import React from "react";

const steps = ["input track info", "load track picture", "load track file"];

interface StepWrapperProps {
  activeStep: number;
}
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: "270px" }}
      >
        <Card style={{width:600}}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
