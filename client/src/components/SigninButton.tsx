"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Cookie from "js-cookie";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log("session: ", session);
  session?.user?.email && Cookie.set("user", session?.user?.email);
  
  if (session && session.user) {
    return (
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <img
          src={session?.user?.image || ""}
          width={40}
          height={40}
          style={{ borderRadius: "40px" }}
          alt="user`s photo"
        />
        {/* <span style={{color:"gray", position:"relative", top:"7px", left:"3px"}} >{session.user.name}</span> */}
        <IconButton onClick={() => signOut()} className="text-red-600">
          <LogoutIcon />
        </IconButton>
      </div>
    );
  }
  return (
    <IconButton onClick={() => signIn()} style={{ marginLeft: "auto" }}>
      <LoginIcon />
    </IconButton>
  );
};

export default SigninButton;
