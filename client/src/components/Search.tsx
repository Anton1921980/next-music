import { NextThunkDispatch } from "@/store";
import { searchTracks } from "@/store/actions-creators/track";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const [query, set$query] = React.useState<string>("");
  const [focused, set$focused] = React.useState(true);

  const dispatch = useDispatch() as NextThunkDispatch;

  let timer:any;

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {

    set$query(e.target.value);

    if (timer) {
      clearTimeout(timer);
    }   

    timer =  setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 1000)
    
  };

  const handleFocus = () => {
    set$focused(!focused);
  };
  return (
    <TextField
      variant="outlined"
      id="outlined-basic"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
        style: {
          borderRadius: "10px",
          height: 40,
        },
      }}
      sx={{ width: "40%", marginLeft: "35px" }}
      value={query}
      onChange={search}
      onFocus={handleFocus}
      onBlur={handleFocus}
      label={focused ? "search tracks" : ""}
      InputLabelProps={{
        shrink: false,
        sx: {
          position: "absolute",
          height: "19px",
          width: "100px",
          top: "-8px",
          left: "30px",
        },
      }}
    />
  );
}
