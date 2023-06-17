import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { IPlaylist } from "../../types/playlist";
import { useRouter } from "next/router";

interface PlaylistsProps {
  playlists: IPlaylist[];
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {

  const router = useRouter(); 

  const choosePlaylist = (id) => {
    console.log("playlist: ", id);

    router.push(`/playlist/${id}`)
    //додати id до стора
  }
  return (
    <Grid container direction="column">
      <Box p={2}>
        Playlists:
        {playlists?.map((playlist) => (
          <div 
          key={playlist?._id}        
          onClick={()=>choosePlaylist(playlist?._id)}          
          >{playlist?.name}</div>
        ))}
      </Box>
    </Grid>
  );
};

export default Playlists;
