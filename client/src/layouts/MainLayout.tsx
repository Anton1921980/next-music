import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Container } from "@mui/material";


const MainLayout: React.FC = ({children}) => {
  return (
    <div>
      <Navbar />
      <Container style={{margin: '3rem 15rem'}}>
      {children}
      </Container>
      <Player/>
    </div>
  );
};
export default MainLayout;
