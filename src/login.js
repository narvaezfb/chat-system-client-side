import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Typography, Paper, Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./themes/theme";
import logo from "./media/logo-v1.png";
const Login = () => {
	const [values, setValues] = React.useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
	});
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

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<ThemeProvider theme={Theme}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "primary.main",
					height: "100vh",
				}}
			>
				<Box
					// elevation={3}
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: "350px",
						padding: 6,
						border: 2,
						borderColor: "secondary.main",
						backgroundColor: "primary.main",
						margin: 2,
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<img
							src={logo}
							width="100px"
							height="100px"
							position="center"
							alt="logo"
						/>
					</Box>

					<TextField
						inputRef={emailRef}
						required
						label="email"
						margin="normal"
						color="secondary"
						focused
						InputProps={{ style: { color: "#e0f7fa" } }}
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
						color="secondary"
						focused
						InputProps={{
							style: { color: "#e0f7fa" },
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										sx={{ color: "primary.light" }}
									>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{ marginTop: 1 }}
						onChange={(event) => {
							setUserPassword(event.target.value);
							clearErrors();
						}}
					/>
					<Button
						variant="contained"
						sx={{ marginTop: 1, mb: 3, backgroundColor: "green.main" }}
						onClick={login}
						onKeyPress={handleEnterKeyPress}
					>
						Log In
					</Button>
					<Divider variant="middle" color="#0d47a1" />
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mt: 1,
						}}
					>
						<Typography color="primary.light">
							Don't have an account?{" "}
							<Link href="/signup" color={"#1DB954"}>
								{" "}
								Register
							</Link>
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
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default Login;
