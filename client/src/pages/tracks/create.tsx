import MainLayout from "@/layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import React from "react";

const Create = () => {
  return (
    <>
      <MainLayout>
        <Grid container justifyContent="center">
          <Card style={{ width: "80%" }}>
            <Box p={3}>
              <Grid container justifyContent="space-between">
                <h1>Upload track</h1>
                <Button>upload</Button>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};
export default Create;
