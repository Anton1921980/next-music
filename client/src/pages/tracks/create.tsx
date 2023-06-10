import FileUploader from "@/components/FileUploader";
import StepWrapper from "@/components/StepWrapper";
import MainLayout from "@/layouts/MainLayout";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const Create = () => {
  const [activeStep, set$activeStep] = useState(0);
  const [picture, set$picture] = useState(null);
  const [audio, set$audio] = useState(null);

  const back = () => {
    set$activeStep((prev) => prev - 1);
  };
  const next = () => {
    set$activeStep((prev) => prev + 1);
  };
  return (
    <>
      <MainLayout>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 && (
            <Grid container direction={"column"} style={{ padding: 20 }}>
              <TextField style={{marginTop:10}} label={"track name"} />
              <TextField style={{marginTop:10}} label={"author"} />
              <TextField style={{marginTop:10}} label={"track text"} multiline rows={5} />
            </Grid>
          )}
          {activeStep === 1 && (
            <FileUploader setFile={set$picture} accept="image/*">
              <Button>choose image</Button>
            </FileUploader>
          )}
           {activeStep === 2 && (
            <FileUploader  setFile={set$audio} accept="audio/*">
              <Button>choose audio</Button>
            </FileUploader>
          )}
        </StepWrapper> 
        <Grid container justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={back}>
            back
          </Button>
          <Button disabled={activeStep === 2} onClick={next}>
            next
          </Button>
        </Grid>
      </MainLayout>
    </>
  );
};
export default Create;
