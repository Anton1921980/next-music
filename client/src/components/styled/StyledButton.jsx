
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";


export const StyledButton = styled(Button)`
  width:${(props)=>{console.log('props',props.currentTheme); return props?.width}};    
  height: auto;
  color: ${(props) => (props.colorPlay ? props.colorPlay : (props?.currentTheme === "dark" ? "white" : "gray"))};

  background-color: ${(props) =>
    props?.currentTheme === "dark"
      ? props.backgroundColor||"rgba(255, 255, 255, 0.1)"
      : props.backgroundColor||"rgba(0, 0, 0, 0.04)"};
  padding-top: 0;
  padding-bottom: 0px;
  border-radius: 35px;
  padding-left: ${(props)=>props?.padding || '25px'};
  padding-right: ${(props)=>props?.padding || '25px'};
  margin-left:${(props)=>props?.margin||'0px'};
  border-color:${(props)=>props?.borderColor};
  text-transform: none;
  &:hover {
    border-color: #a9a9a9;
    background-color: ${(props) => (props.colorPlay && "lightgray")}
  }
`;
