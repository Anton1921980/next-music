import React from "react";
import { Box, Button, Card, Grid, MenuItem } from "@mui/material";
import { IPlaylist } from "../../types/playlist";
import { useRouter } from "next/router";

interface PlaylistsProps {
  playlists: IPlaylist[];
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {

  const router = useRouter();

  return (
    <Grid container direction="column">
      <Box p={2}>
        {playlists?.map((playlist) => (
          <MenuItem
            selected={router.asPath == `/playlist/${playlist?._id}`}    
            key={playlist?._id}
            onClick={() =>  router.push(`/playlist/${playlist?._id}`)}
          >
            {playlist?.name}
          </MenuItem>
        ))}
      </Box>
    </Grid>
  );
};

export default Playlists;

