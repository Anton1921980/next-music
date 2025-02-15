import { useTheme } from "next-themes";
import { GlobalStyles, Theme } from "@mui/material";
import { CssBaseline, ThemeProvider, css } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme/createEmotionCasche";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import styled from "@emotion/styled/macro";

const Div = styled.div`
  min-height: 162.38px;
`;

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme(); 

  const [currentTheme, setCurrentTheme] = useState<Theme>(darkTheme);

  const { changeTheme } = useTypedSelector((state) => state.player);
 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!changeTheme) {
      resolvedTheme === "light"
        ? setCurrentTheme(lightTheme)
        : setCurrentTheme(darkTheme);
    }
  }, [resolvedTheme, changeTheme]);

  useEffect(() => {
    if (!changeTheme) {
      setMounted(true);
    }
  }, [changeTheme]);

  if (!mounted && !changeTheme) {
    return <Div />;
  }

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
