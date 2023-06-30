import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { editTrack, fetchTracks } from "@/store/actions-creators/track";
import { NextThunkDispatch, wrapper } from "@/store";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "@/store/actions-creators/playlist";
import Playlists from "@/components/Playlists";
import { AddSharp } from "@mui/icons-material";
import nextCookies from "next-cookies";
import { StyledButton } from "@/components/styled/StyledButton";



const Index = ({ initialRememberValue }) => {
  const { changeTheme } = useTypedSelector((state) => state.player);

  // const [buttonColor, setButtonColor] = useState(
  //   changeTheme || initialRememberValue === "dark" ? "white" : "gray"
  // );

  const router = useRouter();
  const { tracks, error: trackError } = useTypedSelector(
    (state) => state.track
  );
  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );

  // useEffect(() => {
  //   setButtonColor(
  //     changeTheme || initialRememberValue === "dark" ? "white" : "gray"
  //   );
  //   console.log("changeTheme: ", changeTheme);
  // }, [changeTheme]);

  if (trackError || playlistError) {
    return (
      <MainLayout>
        <h1>{trackError || playlistError}</h1>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout
        title={"all tracks from music tracks hosting"}
        initialRememberValue={initialRememberValue}
      >
        <Grid
          container-fluid
          justifyContent="center"
          sx={{ backgroundColor: "inherit", marginBottom: "20px" }}
        >
          <Card
          // style={{ width: "80%" }}
          >
            <Box p={3} sx={{ backgroundColor: "inherit" }}>
              <Grid
                container-fluid
                justifyContent="space-between"
                alignItems="center"
                sx={{ display: "flex" }}
              >
                <h1>Track list</h1>
                <StyledButton
                  currentTheme={changeTheme || initialRememberValue}
                  onClick={() => router.push("/tracks/create")}
                >
                  <>
                    <span style={{ marginTop: 7 }}>
                      <AddSharp />
                    </span>
                    <span>&nbsp; Track</span>
                  </>
                </StyledButton>
              </Grid>
            </Box>
            {/* <Playlists playlists={playlists} /> */}
            <TrackList tracks={tracks} playlists={playlists} />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};

// Index.getInitialProps = MainLayout.getInitialProps;

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    const dispatch = store?.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    await dispatch(await fetchPlaylists());

    const cookies = nextCookies({ req });
    const initialRememberValue = cookies.rememberMe || null;

    return {
      props: {
        initialRememberValue,
      },
    };
  }
);
