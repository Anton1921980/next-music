import React from "react";
import { Grid } from "@mui/material";
import TrackItem from "./TrackItem";
import { ITrack } from "../../types/track";

interface TrackListProps {
  tracks: ITrack[];
  playlists?: any;
  playlist?: number;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  playlist,
  playlists,
}) => {

  return (
    <Grid container direction="column" sx={{ backgroundColor: "inherit" }}>     
      {tracks?.map((track) => (
        <div key={track._id}>
          <TrackItem track={track} playlist={playlist} playlists={playlists} />
        </div>
      ))}   
    </Grid>
  );
};

export default TrackList;
