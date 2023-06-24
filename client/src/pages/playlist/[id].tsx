import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
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
import { setCurrentPlaylist } from "@/store/actions-creators/player";

const Index = ({ serverPlaylist }) => {
  console.log("serverPlaylist: ", serverPlaylist);

  const [playlist, set$playlist] = React.useState<number>(serverPlaylist);

  const router = useRouter();

  const { tracks, error: trackError } = useTypedSelector(
    (state) => state.track
  );
  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );
  const { tracks: playlistTracks, error: playlistTrackError } =
    useTypedSelector((state) => state.playlistTrack);




  if (trackError || playlistError || playlistTrackError) {
    return (
      <MainLayout>
        <h1>{trackError || playlistError || playlistTrackError}</h1>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout title={"track list from music tracks hosting"}>
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
                <h1>
                  Playlist:{" "}
                  {playlists?.find((item) => item._id == serverPlaylist)?.name}
                </h1>
                <Button
                  sx={{
                    height: "auto",
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    paddingTop: 0,
                    paddingBottom: 0,
                    borderRadius: 15,
                    paddingLeft: 5,
                    paddingRight: 5,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                  // variant="outlined"
                  onClick={() => router.push("/tracks/create")}
                >
                  <>
                    <span style={{ marginTop: 7 }}>
                      <AddSharp />
                    </span>
                    <span>&nbsp; Track</span>
                  </>
                </Button>
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
              playlist={playlist}
              playlists={playlists}
            />
            <h2
              style={{ padding: "1em", backgroundColor: "inherit", margin: 0 }}
            >
              Recommended tracks:
            </h2>
            <TrackList
              tracks={tracks}
              playlist={playlist}
              playlists={playlists}
            />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};
export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const dispatch = store?.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks(`s=${params?.id}`));
    await dispatch(await fetchPlaylistTracks(params?.id));
    await dispatch(await setCurrentPlaylist(params?.id))
    await dispatch(await fetchPlaylists());
    return {
      props: {
        serverPlaylist: params?.id,
      },
    };
  }
);
