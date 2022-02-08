import React from "react";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const login = () => {
    return history.push("/chat");
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
        />
        <TextField
          required
          id="outlined-required"
          label="password"
          sx={{ marginTop: 1 }}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: 1 }}
          onClick={login}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
