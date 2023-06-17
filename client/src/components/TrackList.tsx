import React from "react";
import { ITrack } from "../types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
  playlist: number
}

const TrackList: React.FC<TrackListProps> = ({ tracks,playlist }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks?.map((track) => (
          <div key={track._id}>
            <TrackItem track={track} playlist={playlist}/>
          </div>
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
