import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";

const Login = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [message, setMessage] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const history = useHistory();
	Axios.defaults.withCredentials = true;

	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;

	useEffect(() => {
		Axios.get(`${url}/login`, {
			headers: { Authorization: localStorage.getItem("token") },
		})
			.then((response) => {
				if (response.data.loggedIn) {
					setIsAuthenticated(true);
					return history.push("/chat");
				}
			})
			.catch(() => {
				return history.push("/");
			});
	}, [message]); // eslint-disable-line react-hooks/exhaustive-deps

	const login = async () => {
		if (userEmail === "" || userPassword === "") {
			return setMessage("please provide email and password");
		}

		await Axios.post(`${url}/login`, {
			email: userEmail,
			password: userPassword,
		}).then((response) => {
			if (response.data.auth) {
				setIsAuthenticated(true);
				localStorage.setItem("token", "Bearer " + response.data.token);
				return history.push("/chat");
			} else {
				setMessage("Invalid credentials");
			}
		});
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
					type={"password"}
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
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mt: 1,
					}}
				>
					<Typography>
						Don't have an account? <Link href="/signup"> Register</Link>
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 2,
					}}
				>
					<Typography color="#FF0000"> {message}</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
