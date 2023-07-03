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
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import {
  Button,
  Collapse,
  Container,
  FormControl,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";

import {
  AddSharp,
  ExpandLess,
  ExpandMore,
  PlaylistAddCheck,
  QueueMusic,
  Radio,
} from "@mui/icons-material";
import Playlists from "./Playlists";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useInput } from "@/hooks/useInpute";
import axios from "axios";
import Search from "./Search";
import { NextThunkDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setChangeTheme } from "@/store/actions-creators/player";
// import { useTheme } from "next-themes";
import { useStore } from "react-redux";
import Cookie from "js-cookie";
import { StyledButton } from "./styled/StyledButton";
import SigninButton from "./SigninButton";
import Providers from "./Providers";
import { SelectChangeEvent } from "@mui/material/Select";

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
  backgroundImage: "none",
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
interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const [visible, set$visible] = React.useState(false);
  const [show, set$show] = React.useState(true);
  // const [checked, setChecked] = React.useState(true);
  const [openTheme, setOpenTheme] = React.useState(false);
  // const [themeChosen, setThemeChosen] = React.useState(null);

  const name = useInput("");
  const router = useRouter();

  const dispatch = useDispatch() as NextThunkDispatch;

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
  const handlePlaylists = () => {
    set$show(!show);
  };
  const { playlists, error: playlistError } = useTypedSelector(
    (state) => state.playlist
  );

  const addPlaylist = () => {
    console.log("name: ", name.value);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/playlist`, {
        name: name.value,
      })
      .then((response) => router.push("/tracks").then(handleVisible))
      .catch((error) => console.log("Error", error));
  };

  // const { changeTheme } = useTypedSelector((state) => state.player);

  const handleTheme = (e: SelectChangeEvent<string>) => {
    const target = e.target as HTMLInputElement;
    dispatch(setChangeTheme(target.value));
    Cookie.set("rememberMe", target.value);
  };
  const handleChange = (e: SelectChangeEvent<string>) => {
    handleTheme(e);
    handleClose;
  };

  const handleOpen = (e: React.SyntheticEvent) => {
    // e.stopPropagation(e);
    setOpenTheme(true);
  };

  const handleClose = (e: React.SyntheticEvent) => {
    // e.stopPropagation();
    setOpenTheme(false);
  };

  if (playlistError) {
    return <h1>{playlistError}</h1>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon
            //  style={{ color: "white" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{ height: 25, position: "relative", top: 5 }}
            />
            <span style={{ fontSize: "25px", letterSpacing: "-1.5px" }}>
              YouTrack
            </span>
          </Typography>
          {playlists?.length > 0 && <Search />}
          {/* <Tooltip title="Dark / Light"> */}
          {/* <Switch
              checked={checked}
              onChange={handleTheme}
              inputProps={{ "aria-label": "controlled" }}
            /> */}

          <SigninButton />
          <Tooltip title="Dark / Light">
            <IconButton
              onClick={handleOpen}
              style={
                {
                  // marginLeft: "auto"
                }
              }
            >
              <DarkModeIcon />
            </IconButton>
          </Tooltip>
          {openTheme && (
            <FormControl>
              <Select
                sx={{
                  ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
                  position: "absolute",
                }}
                open={openTheme}
                onClose={handleClose}
                onOpen={handleOpen}
                // value={themeChosen}
                onChange={handleChange}
                inputProps={{ IconComponent: () => null }}
              >
                <MenuItem key={"light"} value={"light"}>
                  light
                </MenuItem>
                <MenuItem key={"dark"} value={"dark"}>
                  dark
                </MenuItem>
              </Select>
            </FormControl>
          )}

          {/* </Tooltip> */}
        </Toolbar>
      </AppBar>
      <Drawer
        // PaperProps={{
        //   sx: {
        //     backgroundColor: "darkblue",
        //     color: "white",
        //   },
        // }}
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ margin: "0 auto" }}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{ height: 25, position: "relative", top: 5 }}
            />
            <span style={{ fontSize: "25px", letterSpacing: "-1.5px" }}>
              YouTrack
            </span>
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon
              // style={{ color: "white" }}
              />
            ) : (
              <ChevronRightIcon
              // style={{ color: "white" }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
        // sx={{borderColor:'rgba(255, 255, 255, 0.1)'}}
        />
        <List>
          {menuItems?.map(({ text, href }, index) => (
            <ListItem
              selected={router.pathname === href}
              key={text}
              disablePadding
            >
              <ListItemButton
                key={href}
                onClick={() => {
                  router.push(href);
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <Radio
                    // style={{ color: "white" }}
                    />
                  ) : (
                    <QueueMusic
                    // style={{ color: "white" }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider
          // sx={{borderColor:'rgba(255, 255, 255, 0.1)'}}
          />
          {playlists.length ? (
            <div style={{ marginLeft: 20 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handlePlaylists}
                  style={{ justifyContent: "space-between" }}
                >
                  <ListItemIcon>
                    <PlaylistAddCheck
                    // style={{ color: "white" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Playlists"} />
                  {show ? (
                    <ExpandLess
                    // style={{ color: "white" }}
                    />
                  ) : (
                    <ExpandMore
                    // style={{ color: "white" }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={show} timeout="auto" unmountOnExit>
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
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 15,
                  }}
                >
                  <StyledButton
                    currentTheme={theme.palette.mode}
                    disabled={visible && name.value.length < 3}
                    width={!visible ? "95%" : "auto"}
                    onClick={!visible ? handleVisible : addPlaylist}
                    padding={!visible ? "25px" : "15px"}          
                   
             
                  >
                    {!visible ? (
                      <>
                        <span style={{ marginTop: 7 }}>
                          <AddSharp />
                        </span>
                        <span>&nbsp; New Playlist</span>
                      </>
                    ) : (
                      <span>&nbsp;+ Add&nbsp;&nbsp;</span>
                    )}
                  </StyledButton>
                  {visible && (
                    <StyledButton
                      currentTheme={theme.palette.mode}
                      padding={"15px"}
                      margin={"2px"}                  
                      onClick={handleVisible}
                      disabled={false}
                    >
                      <span>&nbsp; x Close&nbsp;</span>
                    </StyledButton>
                  )}
                </div>
                <Playlists playlists={playlists} />
              </Collapse>
            </div>
          ) : null}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Container>{children}</Container>
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
