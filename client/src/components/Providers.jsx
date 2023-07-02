"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

// interface Props {
//   children: ReactNode;
// }

const Providers = (props) => {
  console.log("props Providers: ", props);
 
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;