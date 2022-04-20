import React from "react";
import Layout from "./components/layout";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Container, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";

const Account = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
        }}
      ></Box>
    </Layout>
  );
};

export default Account;
