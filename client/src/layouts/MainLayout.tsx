import React from "react";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useState } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";

import { Global } from "@emotion/react";
import { globalStyles } from "@/components/styled/Global";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: any;
  initialRememberValue?: any;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
  initialRememberValue = "dark",
}) => {
  const { changeTheme, active } = useTypedSelector((state) => state.player);

  const [rememberMe, setRememberMe] = useState(initialRememberValue);

  const mode = changeTheme || rememberMe || "dark";
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  React.useEffect(() => {
    console.log("Theme changed:", changeTheme, rememberMe);
  }, [rememberMe, changeTheme]);
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
      <ThemeProvider
        theme={createTheme({
          ...theme,
          // palette: { primary: { main: "#d1005e" } },
          components: {
            MuiToolbar: {
              styleOverrides: {
                root: {
                  backgroundColor: mode === "light" ? "white" : undefined,
                },
              },
            },
            MuiMenuItem: {
              styleOverrides: {
                root: {
                  "&.Mui-selected": {
                    borderRadius: "8px",
                    // "&.Mui-focusVisible": { background: "orange" }
                  },
                },
              },
            },

            //     MuiPopover: {
            //       styleOverrides: {
            //           root: {
            //               '&.MuiPopover-paper': {
            //                   maxHeight: '86px' // Example maximum of two options displayed. About 43px per select option.
            //               }
            //           }
            //   }
            // },
          },
        })}
      >
        <Global styles={globalStyles} />
        <Navbar>{children}</Navbar>
        {/* <Container
        //  style={{ margin: "3rem 15rem" }}
         >{children}</Container> */}
        <Player />
      </ThemeProvider>
    </>
  );
};

export default MainLayout;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = nextCookies({ req });
  const initialRememberValue = cookies.rememberMe || null;
  return {
    props: {
      initialRememberValue,
    },
  };
};
