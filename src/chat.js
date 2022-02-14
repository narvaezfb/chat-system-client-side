import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import ListChats from "./components/listChats";
import ChatContainer from "./components/chatContainer";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";

function Chat() {
  const history = useHistory();
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (!response.data.loggedIn) {
        console.log("user is logged in");

        return history.push("/");
      }
    });
  }, []);

  Axios.defaults.withCredentials = true;
  return (
    <Layout>
      {" "}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: 300,
            border: 1,
          }}
        >
          <ListChats />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <ChatContainer />
        </Box>
      </Box>
    </Layout>
  );
}

export default Chat;
