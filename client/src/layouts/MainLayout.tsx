import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Container } from "@mui/material";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title || "music tracks hosting"}</title>
        <meta name="description" content={'music tracks hosting - everybody can load and play music'+ description} />
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content={ keywords || 'music, tracks, hosting, artist, song'} />
        <meta name="viewport" content='width=device-width, initial-scale=1'/>
        </Head>
      <Navbar />
      <Container style={{ margin: "3rem 15rem" }}>{children}</Container>
      <Player />
    </>
  );
};
export default MainLayout;
