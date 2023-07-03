import React, { FC } from "react";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navbar";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import nextCookies from "next-cookies";

interface IndexProps {
  initialRememberValue: string | null;
}


const Index: FC<IndexProps>  = ({ initialRememberValue }) => {
  return (
    <>
      <MainLayout initialRememberValue={initialRememberValue}>
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
// Index.getInitialProps = MainLayout.getInitialProps;

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req }) => {
    const cookies = nextCookies({ req });
    const initialRememberValue = cookies.rememberMe || null;

    return {
      props: {
        initialRememberValue,
      },
    };
  }
);
