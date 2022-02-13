import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("hello");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn) {
        console.log("user is logged in");
        setIsAuthenticated(true);
        return history.push("/chat");
      }
    });
  }, [message]);

  Axios.defaults.withCredentials = true;

  const login = async () => {
    await Axios.post("/login", {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      if (response.data.status === "success") {
        setIsAuthenticated(true);
        return history.push("/chat");
      } else {
        setMessage("Invalid credentials");
      }
    });
    // return history.push("/chat");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 20,
          width: "25%",
          padding: 6,
          border: 1,
        }}
      >
        <Typography variant="h4" align="center">
          {" "}
          Sign In{" "}
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="email"
          sx={{ marginTop: 1 }}
          onChange={(event) => setUserEmail(event.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="password"
          sx={{ marginTop: 1 }}
          onChange={(event) => setUserPassword(event.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: 1 }}
          onClick={login}
        >
          Submit
        </Button>
        {message}
      </Box>
    </Box>
  );
};

export default Login;
