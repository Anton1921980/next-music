import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

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
      name: "track3",
      artist: "Coolio",
      comments: [{ username: "www", text: "ewftrrrrrrrr" }],
      text: "lorem ipsum dolor sit amet, consectetur",
      audio:
        "http://localhost:5000/audio/e831bbb5-5b01-4aa7-8bec-95d3554a9c97.mp3",
    }
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
