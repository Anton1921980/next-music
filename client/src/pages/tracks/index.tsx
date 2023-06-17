import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { fetchTracks, searchTracks } from "@/store/actions-creators/track";
import { NextThunkDispatch, wrapper } from "@/store";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "@/store/actions-creators/playlist";
import Playlists from "@/components/Playlists";
import { AddSharp } from "@mui/icons-material";

const Index = () => {
  const router = useRouter();
  const { tracks, error: trackError } = useTypedSelector(
    (state) => state.track
  );
  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );

  const [query, set$query] = useState<string>("");
  const [timer, set$timer] = useState(null);

  const dispatch = useDispatch() as NextThunkDispatch;

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    set$query(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    set$timer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 1000)
    );
  };

  if (trackError || playlistError) {
    return (
      <MainLayout>
        <h1>{trackError || playlistError}</h1>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout title={"track list from music tracks hosting"}>
        <Grid container justifyContent="center">
          <Card style={{ width: "85%" }}>
            <Box p={3}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <h1>Track list</h1>
                <Button
                  style={{ height: "auto" }}
                  variant="outlined"
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
              <TextField
                style={{ width: "98%", marginLeft: 10, marginTop: 15 }}
                value={query}
                onChange={search}
                label={
                  <>
                    <span>
                      <SearchIcon />
                    </span>
                    <span
                      style={{
                        position: "relative",
                        bottom: 5,
                        marginLeft: 2,
                        fontSize: 14,
                      }}
                    >
                      track
                    </span>
                  </>
                }
              />
            </Box>
            {/* <Playlists playlists={playlists} /> */}
            <TrackList tracks={tracks} />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};
export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store?.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    await dispatch(await fetchPlaylists());
  }
);
