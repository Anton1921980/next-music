import FileUploader from "@/components/FileUploader";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInpute";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import nextCookies from "next-cookies";

const Create = ({initialRememberValue}) => {
  const [activeStep, set$activeStep] = useState(0);
  const [picture, set$picture] = useState(null);
  const [audioName, set$audioName] = useState(null);
  const [pictureUrl, set$pictureUrl] = useState(null);

  const [audio, set$audio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const router = useRouter();

  const back = () => {
    set$activeStep((prev) => prev - 1);
  };
  const next = () => {
    if (activeStep !== 2) {
      set$activeStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      console.log("formData: ", formData);

      axios
        .post("http://localhost:5000/tracks", formData)
        .then((response) => router.push("/tracks"))
        .catch((error) => console.log("Error", error));
    }
  };
  return (
    <>
      <MainLayout  initialRememberValue={initialRememberValue}>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 && (
            <Grid container direction={"column"} style={{ padding: 20 }}>
              <TextField
                {...name}
                style={{ marginTop: 10 }}
                label={"track name"}
              />
              <TextField
                {...artist}
                style={{ marginTop: 10 }}
                label={"artist"}
              />
              <TextField
                {...text}
                style={{ marginTop: 10 }}
                label={"track text"}
                multiline
                rows={5}
              />
            </Grid>
          )}
          {activeStep === 1 && (
            <FileUploader
              setFile={set$picture}
              setPictureUrl={set$pictureUrl}
              accept="image/*"
            >
              <Button>choose image</Button>
            </FileUploader>
          )}
          {activeStep === 2 && (
            <FileUploader
              setFile={set$audio}
              setAudioName={set$audioName}
              accept="audio/*"
            >
              <Button>choose audio</Button>
            </FileUploader>
          )}

          {name.value && artist.value && text.value && (
            <>
              <div>TRACK: {name.value}</div>
              <div>ARTIST: {artist.value}</div>
              <div>TEXT: {text?.value?.slice(0, 50)}...</div>
            </>
          )}
          {audioName && <div>AUDIO: {audioName}</div>}
          {pictureUrl && (
            <div style={{ width: "30%", overflow: "hidden" }}>
              <img
                style={{ objectFit: "contain", width: "70%" }}
                src={pictureUrl}
                alt=""
              />
            </div>
          )}
        </StepWrapper>
        <Grid container justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={back}>
            back
          </Button>
          <Button disabled={activeStep === 5} onClick={next}>
            next
          </Button>
        </Grid>
      </MainLayout>
    </>
  );
};

export default Create;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req }) => {

    const cookies = nextCookies({ req });
    const initialRememberValue = cookies.rememberMe || null;

    return {
      props: {
        initialRememberValue,
      },
    };
  }
);