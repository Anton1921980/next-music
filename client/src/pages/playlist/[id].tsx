import MainLayout from "@/layouts/MainLayout";
import React, { FC, useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { fetchTracks } from "@/store/actions-creators/track";
import { NextThunkDispatch, wrapper } from "@/store";
import { useDispatch } from "react-redux";
import {
  fetchPlaylistTracks,
  fetchPlaylists,
} from "@/store/actions-creators/playlist";
import Playlists from "@/components/Playlists";
import { AddSharp } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { setCurrentPlaylist } from "@/store/actions-creators/player";
import Image from "next/image";
import nextCookies from "next-cookies";
import { StyledButton } from "@/components/styled/StyledButton";
import { useSession } from "next-auth/react";
import { ITrack } from "../../../types/track";

interface IndexProps {
  initialRememberValue: string | null;
  serverPlaylist: string;
  user: string | null;
  error?: string;
}

const Index: FC<IndexProps> = ({
  serverPlaylist,
  initialRememberValue,
  user,
  error,
}) => {
  console.log("user: ", user);
  console.log("serverPlaylist: ", serverPlaylist);

  const router = useRouter();
  const { changeTheme } = useTypedSelector((state) => state.player);
  const { tracks, error: trackError } = useTypedSelector((state) => state.track);
  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );
  const { tracks: playlistTracks, error: playlistTrackError } =
    useTypedSelector((state) => state.playlistTrack);

  const currentTheme = changeTheme || initialRememberValue;

  if (error || trackError || playlistError || playlistTrackError) {
    return (
      <MainLayout>
        <Box p={3} textAlign="center">
          <h1>{error || trackError || playlistError || playlistTrackError}</h1>
          <Button
            variant="contained"
            onClick={() => router.push("/tracks")}
            sx={{ mt: 2 }}
          >
            Повернутися до списку треків
          </Button>
        </Box>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout
        title={"track list from music tracks hosting"}
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
                justifyContent="flex-start"
                alignItems="center"
                sx={{ display: "flex" }}
              >
                <Grid container sx={{ width: "200px" }}>
                  {playlistTracks
                    .slice(0, 4)
                    ?.map((track: ITrack, index: number) => (
                      <Grid
                        item
                        xs={6}
                        key={index}
                        sx={{ width: "100px", lineHeight: 0.8 }}
                      >
                        {track?.picture && (
                          <img
                            width={100}
                            height={100}
                            src={
                              process.env.NEXT_PUBLIC_SERVER_URL +
                              "/" +
                              track.picture
                            }
                            alt=""
                          />
                        )}
                      </Grid>
                    ))}
                </Grid>
                <Grid
                  container
                  sx={{
                    flexDirection: "column",
                    marginLeft: "50px",
                    width: "400px",
                  }}
                >
                  <h1>
                    {/* Playlist:{" "} */}
                    {
                      playlists?.find((item) => item._id == serverPlaylist)
                        ?.name
                    }
                  </h1>
                  <Grid container>
                    <StyledButton
                      currentTheme={currentTheme}
                      onClick={() => router.push("/tracks/create")}
                      disabled={false}
                    >
                      <>
                        <span style={{ marginTop: 7 }}>
                          <AddSharp />
                        </span>
                        <span>&nbsp; New Track</span>
                      </>
                    </StyledButton>
                    <StyledButton
                      currentTheme={currentTheme}
                      backgroundColor={
                        currentTheme === "dark"
                          ? "rgba(255, 255, 255, 0.0)"
                          : "rgba(255, 255, 255, 0.1)"
                      }
                      variant="outlined"
                      borderColor={
                        currentTheme === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.2)"
                      }
                      disabled={false}
                      onClick={() => router.push("/tracks/create")}
                    >
                      <>
                        <span style={{ marginTop: 7 }}>
                          <EditIcon
                            sx={{ fontSize: "medium", marginBottom: "2px" }}
                          />
                        </span>
                        <span>&nbsp; Edit Playlist</span>
                      </>
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* <Playlists playlists={playlists} /> */}
            {/* <div>Playlist: {playlist}</div> */}
            {/* <h2
              style={{ padding: "1em", backgroundColor: "inherit", margin: 0 }}
            >
              Added tracks:
            </h2> */}

            <TrackList
              tracks={playlistTracks}
              playlist={serverPlaylist}
              playlists={playlists}
            />
            <h2
              style={{ padding: "1em", backgroundColor: "inherit", margin: 0 }}
            >
              Recommended tracks:
            </h2>
            <TrackList
              tracks={tracks}
              playlist={serverPlaylist}
              playlists={playlists}
            />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};

// Index.getInitialProps = MainLayout.getInitialProps;

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params, req }) => {
    const dispatch = store?.dispatch as NextThunkDispatch;
    const playlistId = params?.id ? String(params.id) : null;

    if (!playlistId) {
      return {
        notFound: true,
      };
    }

    try {
      await dispatch(await fetchTracks(`s=${playlistId}`));
      await dispatch(await fetchPlaylistTracks(playlistId));
      await dispatch(await setCurrentPlaylist(playlistId));
      await dispatch(await fetchPlaylists());

      const cookies = nextCookies({ req });
      const initialRememberValue = cookies.rememberMe || null;
      const user = cookies.user || null;

      return {
        props: {
          serverPlaylist: playlistId,
          initialRememberValue,
          user,
        },
      };
    } catch (error) {
      console.error("Error in getServerSideProps:", error);
      return {
        props: {
          serverPlaylist: playlistId,
          initialRememberValue: null,
          user: null,
          error: "Failed to load playlist",
        },
      };
    }
  }
);
