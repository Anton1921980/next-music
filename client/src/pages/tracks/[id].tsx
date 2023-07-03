import React, { FC } from "react";
import { ITrack } from "../../../types/track";
import MainLayout from "@/layouts/MainLayout";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useInput } from "@/hooks/useInpute";
import nextCookies from "next-cookies";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LyricsIcon from "@mui/icons-material/Lyrics";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { StyledButton } from "@/components/styled/StyledButton";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Add, AddSharp, PlayArrow, Remove } from "@mui/icons-material";
import { useActions } from "@/hooks/useActions";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "@/store";
import {
  addOrRemoveToPlaylist,
  handleChange,
  play,
} from "@/helpers/trackFunctions";
import { GetServerSideProps } from "next";

interface TrackPageProps {
  initialRememberValue: string | null;
  serverTrack: any;
}

const TrackPage: FC<TrackPageProps> = ({
  serverTrack,
  initialRememberValue,
}) => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;

  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );
  const { changeTheme, active } = useTypedSelector((state) => state.player);

  const [track, set$track] = React.useState<ITrack>(serverTrack);
  const [playlistChosen, setPlaylistChosen] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const userName = useInput("");
  const text = useInput("");

  const handlePlay = (e: any) => {
    play(e, setActiveTrack, pauseTrack, track);
  };

  const handleAddOrRemoveToPlaylist = async (e: any) => {
    await addOrRemoveToPlaylist(e, dispatch, track, null, playlists, router);
  };

  const handleInputChange = (e: any) => {
    handleChange(
      e,
      setPlaylistChosen,
      handleAddOrRemoveToPlaylist,
      handleClose
    );
  };

  const handleOpen = (e: any) => {
    e.stopPropagation(e);
    setOpen(true);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  const addComment = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/tracks/comment",
        {
          userName: userName.value,
          text: text.value,
          trackId: track._id,
        }
      );
      set$track({ ...track, comments: [...track.comments, response.data] });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const currentTheme = changeTheme || initialRememberValue;

  console.log("env:", process.env.NEXT_PUBLIC_NEXT_PUBLIC_SERVER_URL);

  return (
    <MainLayout
      title={"music tracks host: " + track.name + "-" + track.artist}
      initialRememberValue={initialRememberValue}
    >
      <Button
        //  variant="outlined"
        onClick={() => router.back()}
        sx={{ textTransform: "none" }}
      >
        <KeyboardBackspaceIcon />
        <span>&nbsp;back to tracks</span>
      </Button>
      {/* <div>TRACK PAGE</div> */}
      <Grid container style={{ margin: "20px 0" }}>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + track.picture}
          alt=""
          width={300}
          height={300}
        />
        <Grid item sx={{ marginLeft: "40px" }}>
          <h1 style={{ fontSize: "40px" }}> {track.name}</h1>
          <h2 style={{ color: "gray" }}> {track.artist}</h2>
          <h2 style={{ color: "gray" }}>played: {track.listens}</h2>
          <Grid container>
            <StyledButton
              currentTheme={currentTheme}
              backgroundColor={currentTheme === "dark" ? "white" : "gray"}
              colorPlay={currentTheme === "dark" ? "black" : "white"}
              onClick={handlePlay}
            >
              <>
                <span style={{ marginTop: 7 }}>{/* <AddSharp /> */}</span>
                <PlayArrow />
                <span>&nbsp; Play</span>
              </>
            </StyledButton>
            <StyledButton
              currentTheme={currentTheme}
              margin={"10px"}
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
              onClick={handleOpen}
            >
              <>
                <span style={{ marginTop: 7 }}>
                  <AddSharp />
                </span>
                <span>&nbsp; Add to Playlist</span>
              </>
            </StyledButton>
            {open && (
              <FormControl>
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        overflowY: "scroll",
                        maxHeight: "200px",
                        scrollbarWidth: "thin",
                      },
                    },
                  }}
                  sx={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "-110px",
                    ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
                  }}
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={playlistChosen}
                  onChange={handleInputChange}
                  inputProps={{ IconComponent: () => null }}
                >
                  {playlists
                    ?.filter((item) => !track.playlists.includes(item._id))
                    .map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        <Add />
                        {item.name}
                      </MenuItem>
                    ))}
                  {playlists
                    ?.filter((item) => track.playlists.includes(item._id))
                    .map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        <Remove /> {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <LyricsIcon />
        <span style={{ position: "relative", bottom: "6px" }}>
          &nbsp;Track text
        </span>
      </Grid>
      <p>{track.text}</p>
      <Grid container style={{ margin: "20px 0" }}>
        <TextField {...userName} label="your name" fullWidth />
        <TextField {...text} label="comment" fullWidth multiline rows={5} />
        <Button
          // variant="outlined"
          onClick={addComment}
          sx={{ textTransform: "none" }}
        >
          <AddCommentIcon />
          &nbsp;Send comment
        </Button>
      </Grid>
      <div>
        {track?.comments?.map((comment) => (
          <>
            <div>name: {comment.userName}</div>
            <div>comment: {comment.text}</div>
          </>
        ))}
      </div>
    </MainLayout>
  );
};

// TrackPage.getInitialProps = MainLayout.getInitialProps;

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/tracks/" + params?.id
  );

  const cookies = nextCookies({ req });
  const initialRememberValue = cookies.rememberMe || null;

  return {
    props: {
      serverTrack: response.data,
      initialRememberValue,
    },
  };
};
