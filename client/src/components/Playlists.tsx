import React from "react";
import { Box, MenuItem } from "@mui/material";
import { IPlaylist } from "../../types/playlist";
import { useRouter } from "next/router";
import { ThumbUp } from "@mui/icons-material";

interface PlaylistsProps {
  playlists: IPlaylist[];
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {
  const router = useRouter();

  const likedPlaylist = playlists?.find((item) => item.name == "Liked");
  const otherPlaylists = playlists?.filter((item) => item.name != "Liked");

  return (
    <Box p={2}>
      {likedPlaylist && (
        <MenuItem
          selected={router.asPath == `/playlist/${likedPlaylist._id}`}
          key={likedPlaylist._id}
          onClick={() => router.push(`/playlist/${likedPlaylist._id}`)}
        >
          <ThumbUp sx={{fontSize:'small'}}/>
          &nbsp;Liked Music
        </MenuItem>
      )}
      {otherPlaylists?.map((playlist) => (
        <MenuItem
          sx={{
            "&:hover": {
              // borderColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
            },
            "&& .Mui-selected": {
              borderRadius: "8px",
            },
          }}
          selected={router.asPath == `/playlist/${playlist._id}`}
          key={playlist._id}
          onClick={() => router.push(`/playlist/${playlist._id}`)}
        >
          {playlist.name}
        </MenuItem>
      ))}
    </Box>
  );
};

export default Playlists;
