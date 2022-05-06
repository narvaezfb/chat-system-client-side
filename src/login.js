import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Typography, Paper, Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import BackgroundImage from "./media/green-brick-2.jpeg";

const Login = () => {
	//state variables
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	//ref variables
	const emailRef = useRef();
	const passwordRef = useRef();

	//history
	const location = useLocation();
	const history = useHistory();

	//enable axios credentials
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

		console.log(location.state);

		//focus email input when page loads
		emailRef.current.focus();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const login = async () => {
		var errors = [];

		if (userEmail === "") {
			errors.push("please enter email");
			emailRef.current.focus();
		}

		if (userPassword === "") {
			errors.push("please enter password");
			passwordRef.current.focus();
		}

		if (errors.length === 0) {
			await Axios.post(`${url}/login`, {
				email: userEmail,
				password: userPassword,
			}).then((response) => {
				if (response.data.auth) {
					setIsAuthenticated(true);
					localStorage.setItem("token", "Bearer " + response.data.token);
					return history.push("/chat");
				} else {
					errors.push("Invalid credentials, try again");
					emailRef.current.focus();
					return setErrorMessage(errors);
				}
			});
		} else {
			setErrorMessage(errors);
		}
	};

	//This function will be in charge of clearing the error messages displayed on the page
	const clearErrors = () => {
		setErrorMessage([]);
	};

	//This function will allow user to submit the form by hitting enter keyword
	const handleEnterKeyPress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			login();
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundImage: `url(${BackgroundImage})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				height: "98vh",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					width: "350px",
					padding: 6,
					border: 2,
					borderBlockColor: "#1b5e20",
					margin: 2,
				}}
			>
				<TextField
					inputRef={emailRef}
					required
					id="outlined-required"
					label="email"
					sx={{ marginTop: 1 }}
					onChange={(event) => {
						setUserEmail(event.target.value);
						clearErrors();
					}}
				/>
				<TextField
					inputRef={passwordRef}
					required
					id="outlined-required"
					label="password"
					type={"password"}
					sx={{ marginTop: 1 }}
					onChange={(event) => {
						setUserPassword(event.target.value);
						clearErrors();
					}}
				/>
				<Button
					variant="contained"
					sx={{ marginTop: 1, mb: 3, backgroundColor: "#1b5e20" }}
					onClick={login}
					onKeyPress={handleEnterKeyPress}
				>
					Log In
				</Button>
				<Divider variant="middle" />
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
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 2,
					}}
				>
					{errorMessage.map((messages, index) => {
						return (
							<Typography color="#f44336" key={index}>
								{" "}
								{messages}
							</Typography>
						);
					})}
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 2,
					}}
				>
					<Typography> {location.state?.message}</Typography>
				</Box>
			</Paper>
		</Box>
	);
};

export default Login;
