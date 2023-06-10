import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "@/components/TrackList";

const Index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    { _id: 1, name: "track1", artist: "Dre" },
    {
      _id: 2,
      name: "track2",
      artist: "2-PAC",
      comments: ["rewrelkf", "fjkrhgkfghk"],
    },
    {
      _id: 3,
      name: "track3",
      artist: "Coolio",
      comments: ["rewrelkfrytyyyyyyy", "fjkrhgkfghrtretryrk"],
      text:"lorem ipsum dolor sit amet, consectetur"
    },
  ];
  return (
    <>
      <MainLayout>
        <Grid container justifyContent="center">
          <Card style={{ width: "80%" }}>
            <Box p={3}>
              <Grid container justifyContent="space-between">
                <h1>Track list</h1>
                <Button onClick={() => router.push("/tracks/create")}>
                  upload
                </Button>
              </Grid>
            </Box>
            <TrackList tracks={tracks} />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};
export default Index;
