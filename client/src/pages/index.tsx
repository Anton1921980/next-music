import React from "react";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navbar";
import MainLayout from "@/layouts/MainLayout";


const Index = () => {
  return (
    <>
      <MainLayout>
      <div className="center">
        <h1>Welcome</h1>
        <h3>Best tracks are here</h3>

        {/* <Button variant="outlined" >main</Button> */}
      </div>
      <style jsx>
        {`
          .center {
            display: flex;
            margin-top: 10rem;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      </MainLayout>
    </>
  );
};
export default Index;
