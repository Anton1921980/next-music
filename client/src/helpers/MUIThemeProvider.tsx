import { useTheme } from "next-themes";
import { GlobalStyles } from "@mui/material";
import { CssBaseline, ThemeProvider, css } from "@mui/material";


import { FC, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./theme/createEmotionCasche";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();
  console.log("resolvedTheme: ", resolvedTheme);
  const [currentTheme, setCurrentTheme] = useState("darkTheme");

  const { changeTheme } = useTypedSelector((state) => state.player);
  console.log("changeTheme: ", changeTheme);

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
  return (
    <div
      css={css`
        min-height: 162.38px;
      `}
    ></div>
  );
}


  return (
    <ThemeProvider theme={currentTheme}> 
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;