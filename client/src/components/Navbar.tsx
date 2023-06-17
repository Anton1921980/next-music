import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { AddSharp, HdrPlus, PlusOne, PlusOneSharp } from "@mui/icons-material";
import Playlists from "./Playlists";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { fetchPlaylists } from "@/store/actions-creators/playlist";
import { NextThunkDispatch, wrapper } from "@/store";
import { useInput } from "@/hooks/useInpute";
import axios from "axios";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [visible, set$visible] = React.useState(false);
  console.log("visible: ", visible);
  const name = useInput("");

  const router = useRouter();
  const menuItems = [
    { text: "Main", href: "/" },
    { text: "Tracks", href: "/tracks" },
    // { text: "Playlists", href: "/albums" },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleVisible = () => {
    set$visible(!visible);
  };
  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );

  const addPlaylist = () => {
    console.log("name: ", name.value);
    axios
      .post("http://localhost:5000/tracks/playlist", { name: name.value })
      .then((response) => router.push("/tracks").then(handleVisible))
      .catch((error) => console.log("Error", error));
  };

  if (playlistError) {
    return <h1>{playlistError}</h1>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TrackHOST
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems?.map(({ text, href }, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton key={href} onClick={() => router.push(href)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {playlists?.length && (
          <>
            <div
              style={{
                display: visible ? "block" : "none",
                width: "80%",
                margin: "0 auto",
              }}
            >
              <TextField
                {...name}
                style={{ marginTop: 10 }}
                label={"Playlist name"}
                helperText={"at least 3 letters required"}
              />
              {/* <Button onClick={addPlaylist}>Add</Button> */}
            </div>
            <Button
              disabled={visible && name.value.length < 3}
              style={{ height: "auto", margin: "0 auto", marginTop: 30 }}
              variant="outlined"
              onClick={!visible ? handleVisible : addPlaylist}
            >
              <>
                <span style={{ marginTop: 7 }}>
                  <AddSharp />
                </span>
                {!visible ? (
                  <span>&nbsp; Playlist</span>
                ) : (
                  <span>&nbsp; Add</span>
                )}
              </>
            </Button>
            <Playlists playlists={playlists} />
          </>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     const dispatch = store?.dispatch as NextThunkDispatch;
//     await dispatch(await fetchPlaylists());
//   }
// );
