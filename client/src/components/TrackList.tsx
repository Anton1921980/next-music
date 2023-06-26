import React from "react";
import { ITrack } from "../types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import TrackItem from "./TrackItem";
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface TrackListProps {
  tracks: ITrack[];
  playlists: any;
  playlist: number;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  playlist,
  playlists,
}) => {
  console.log("tracks: ", tracks);
  return (
    <Grid container direction="column" sx={{ backgroundColor: "inherit" }}>
      {/* <Box p={2}> */}
      {tracks?.map((track) => (
        <div key={track._id}>
          <TrackItem track={track} playlist={playlist} playlists={playlists} />
        </div>
      ))}
      {/* </Box> */}
    </Grid>
  );
};

export default TrackList;
