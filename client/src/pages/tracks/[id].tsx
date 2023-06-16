import React from "react";
import { ITrack } from "../../../types/track";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useInput } from "@/hooks/useInpute";

const TrackPage = ({ serverTrack }) => {
  const router = useRouter();

  const [track, set$track] = React.useState<ITrack>(serverTrack);

  const userName = useInput(""); 
  const text = useInput("");

  const addComment = async () => {
    try {
      console.log("userName: ", userName);
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        userName: userName.value,
        text: text.value,
        trackId: track._id
      })
      set$track({...track, comments: [...track.comments, response.data]})
    } catch (error) {
      console.log("error: ", error);
    }

  };
console.log("comm",track)
  return (
    <MainLayout title={'music tracks host: '+ track.name + '-' + track.artist}>
      <Button variant="outlined" onClick={() => router.push("/tracks")}>
        to tracklist
      </Button>
      <div>TRACK PAGE</div>
      <Grid container style={{ margin: "20px 0" }}>
        <Image
          src={"http://localhost:5000/" + track.picture}
          alt=""
          width={200}
          height={200}
        />
        <div>
          <h1>track: {track.name}</h1>
          <h1>artist: {track.artist}</h1>
          <h1>played: {track.listens}</h1>
        </div>
      </Grid>
      <h1>Song text</h1>
      <p>{track.text}</p>
      <Grid container style={{ margin: "20px 0" }}>
        <TextField {...userName} label="your name" fullWidth />
        <TextField {...text} label="comment" fullWidth multiline rows={5} />
        <Button 
         variant="outlined"
         onClick={addComment}
         > 
          Send comment
         </Button>
      </Grid>
      <div>
        {track?.comments?.map((comment) => (
          <>
            <div>name: {comment.userName}</div>
            <div>comment: {comment.text}</div>
          </>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get("http://localhost:5000/tracks/" + params.id);
  return {
    props: {
      serverTrack: response.data,
    },
  };
};
