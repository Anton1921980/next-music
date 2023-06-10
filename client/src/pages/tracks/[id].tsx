import React from "react";
import { ITrack } from "../../../types/tracks";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const TrackPage = () => {
  const track: ITrack = {
    name: "track3",
    artist: "Coolio",
    comments: [{username:"www",text:"ewftrrrrrrrr"}],
    text: "lorem ipsum dolor sit amet, consectetur",
  };
  const router = useRouter();
  return (
    <MainLayout>
      <Button variant="outlined" onClick={() => router.push("/tracks")}>
        to tracklist
      </Button>
      <div>TRACK PAGE</div>
      <Grid container style={{ margin: "20px 0" }}>
        <Image src={track.picture} alt="" width={200} height={200} />
        <div>
          <h1>track: {track.name}</h1>
          <h1>artist: {track.artist}</h1>
          <h1>played: {track.listens}</h1>
        </div>
      </Grid>
      <h1>Song text</h1>
      <p>{track.text}</p>
      <Grid container style={{ margin: "20px 0" }}>
        <TextField label="your name" fullWidth />
        <TextField label="comment" fullWidth multiline rows={5} />
        <Button variant="outlined">Send comment</Button>
      </Grid>
      <div>
        {track?.comments?.map((comment) => (
          <>
            <div>name: {comment.username}</div>
            <div>comment: {comment.text}</div>
          </>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;
