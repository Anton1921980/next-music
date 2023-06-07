import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <MainLayout>
        <Grid container justifyContent="center">
          <Card style={{ width: "80%" }}>
            <Box p={3}>
              <Grid container justifyContent="space-between">
                <h1>Track list</h1>
                <Button onClick={()=>router.push('/tracks/create')}>upload</Button>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </MainLayout>
     
    </>
  );
};
export default Index;
