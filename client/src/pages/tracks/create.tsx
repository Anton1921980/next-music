import FileUploader from "@/components/FileUploader";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInpute";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";
import nextCookies from "next-cookies";

interface CreateProps {
  initialRememberValue: string | null;
}

const Create: FC<CreateProps> = ({ initialRememberValue }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    artist: false,
    text: false
  });

  const name = useInput("", { required: true, minLength: 1 });
  const artist = useInput("", { required: true, minLength: 1 });
  const text = useInput("", { required: true, minLength: 1 });

  const router = useRouter();

  // Перевірка валідації для кожного кроку
  useEffect(() => {
    switch (activeStep) {
      case 0:
        setIsNextDisabled(
          !name.value.trim() || 
          !artist.value.trim() || 
          !text.value.trim() ||
          name.value.length < 1 ||
          artist.value.length < 1 ||
          text.value.length < 1
        );
        break;
      case 1:
        setIsNextDisabled(!picture);
        break;
      case 2:
        setIsNextDisabled(!audio);
        break;
      default:
        setIsNextDisabled(false);
    }
  }, [activeStep, name.value, artist.value, text.value, picture, audio]);

  const handleFieldBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const next = () => {
    // Позначаємо всі поля як зачеплені при спробі переходу далі
    if (activeStep === 0) {
      setTouchedFields({
        name: true,
        artist: true,
        text: true
      });
      
      if (isNextDisabled) return;
    }

    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      picture && formData.append("picture", picture);
      audio && formData.append("audio", audio);

      axios
        .post(process.env.NEXT_PUBLIC_SERVER_URL + "/tracks", formData)
        .then((response) => router.push("/tracks"))
        .catch((error) => console.log("Error", error));
    }
  };

  const renderTrackInfo = () => {
    if (!name.value && !artist.value && !text.value && !audioName) {
      return null;
    }

    return (
      <Box mt={3} p={2} bgcolor="rgba(0, 0, 0, 0.03)" borderRadius={1}>
        <Typography variant="h6" gutterBottom>
          Track Preview
        </Typography>
        {name.value && (
          <Typography variant="body1">
            <strong>Track:</strong> {name.value}
          </Typography>
        )}
        {artist.value && (
          <Typography variant="body1">
            <strong>Artist:</strong> {artist.value}
          </Typography>
        )}
        {text.value && (
          <Typography variant="body1">
            <strong>Lyrics:</strong> {text.value.slice(0, 100)}
            {text.value.length > 100 ? '...' : ''}
          </Typography>
        )}
        {audioName && (
          <Typography variant="body1">
            <strong>Audio:</strong> {audioName}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <MainLayout initialRememberValue={initialRememberValue}>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              required
              error={touchedFields.name && !name.value.trim()}
              style={{ marginTop: 10 }}
              label="Track name"
              helperText={touchedFields.name && !name.value.trim() ? "This field is required" : ""}
              onBlur={() => handleFieldBlur('name')}
            />
            <TextField
              {...artist}
              required
              error={touchedFields.artist && !artist.value.trim()}
              style={{ marginTop: 10 }}
              label="Artist name"
              helperText={touchedFields.artist && !artist.value.trim() ? "This field is required" : ""}
              onBlur={() => handleFieldBlur('artist')}
            />
            <TextField
              {...text}
              required
              error={touchedFields.text && !text.value.trim()}
              style={{ marginTop: 10 }}
              label="Track lyrics"
              multiline
              rows={3}
              helperText={touchedFields.text && !text.value.trim() ? "This field is required" : ""}
              onBlur={() => handleFieldBlur('text')}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <Box textAlign="center">
            <FileUploader setFile={setPicture} accept="image/*" setPictureUrl={setPictureUrl}>
              <Button variant="contained">
                {pictureUrl ? "Change cover image" : "Upload cover image"}
              </Button>
            </FileUploader>
            {pictureUrl && (
              <Box mt={2}>
                <Image 
                  width={300} 
                  height={300} 
                  src={pictureUrl} 
                  alt="Cover preview"
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
              </Box>
            )}
          </Box>
        )}
        {activeStep === 2 && (
          <Box textAlign="center">
            <FileUploader setFile={setAudio} accept="audio/*" setAudioName={setAudioName}>
              <Button variant="contained">
                {audioName ? "Change audio file" : "Upload audio file"}
              </Button>
            </FileUploader>
            {audioName && (
              <Typography variant="body1" mt={2}>
                Selected file: {audioName}
              </Typography>
            )}
          </Box>
        )}
        {renderTrackInfo()}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button 
          variant="outlined"
          disabled={activeStep === 0} 
          onClick={back}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={isNextDisabled}
          onClick={next}
        >
          {activeStep === 2 ? "Create" : "Next"}
        </Button>
      </Grid>
    </MainLayout>
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
