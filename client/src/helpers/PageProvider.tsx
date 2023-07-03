import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import Head from "next/head";
import { FC } from "react";
import MUIThemeProvider from "./MUIThemeProvider";



interface PageProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({
  children, 
}) => (
  <PreferredThemeProvider>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider>{children}</MUIThemeProvider>
  
  </PreferredThemeProvider>
);

export default PageProvider;