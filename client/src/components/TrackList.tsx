import React from "react";
import { ITrack } from "../types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import { Book } from "@material-ui/icons";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <div key={track._id}>
            <TrackItem  track={track} />
          </div>
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
