import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Container } from "@mui/material";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useState, useEffect } from "react";
import { NextThunkDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setChangeTheme } from "@/store/actions-creators/player";
import PageProvider from "@/helpers/PageProvider";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: any;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  // const [userTheme, setUserTheme] = useState(null);
  // const { changeTheme } = useTypedSelector((state) => state.player);
  // const [loading, setLoading] = useState(true);

  // const dispatch = useDispatch() as NextThunkDispatch;

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setUserTheme(window.localStorage.getItem('theme'));
  //     dispatch(setChangeTheme(userTheme||'dark'));
  //     setLoading(false);
  //   }
  // }, [changeTheme]);

  // console.log("changeTheme: ", changeTheme);
  // console.log("userTheme: ", userTheme);

  // const theme = createTheme({
  //   palette: {
  //     mode: userTheme === "dark" ? "dark" : "light",
  //   },
  // });
  // console.log("theme: ", theme);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <Head>
        <title>{title || "music tracks hosting"}</title>
        <meta
          name="description"
          content={
            "music tracks hosting - everybody can load and play music" +
            description
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={keywords || "music, tracks, hosting, artist, song"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <h1>test</h1> */}
      <PageProvider>
        <Navbar>{children}</Navbar>
        {/* <Container
        //  style={{ margin: "3rem 15rem" }}
         >{children}</Container> */}
        <Player />
      </PageProvider>
    </>
  );
};
export default MainLayout;
