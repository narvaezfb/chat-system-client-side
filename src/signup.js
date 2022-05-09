import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import BackgroundImage from "./media/green-brick-2.jpeg";
import validator from "validator";

const Signup = () => {
	//state variables for each state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errorMessages, setErrorMessages] = useState([]);

	//ref variables
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	//history
	const history = useHistory();

	//enable axios credentials
	Axios.defaults.withCredentials = true;

	//url that will be sent the API calls
	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	const signup = () => {
		setErrorMessages([]);
		var errors = [];

		if (name === "") {
			errors.push("user must enter a name");
			nameRef.current.focus();
		} else {
			if (name.length < 3) {
				errors.push("name must contain at least 3 characters");
				nameRef.current.focus();
			}
		}

		if (email === "") {
			errors.push("user must enter a email");
			emailRef.current.focus();
		} else {
			if (validator.isEmail(email) === false) {
				errors.push("user must enter a valid email");
				emailRef.current.focus();
			}
		}

		if (password === "") {
			errors.push("user must enter password");
			passwordRef.current.focus();
		}

		if (passwordConfirm === "") {
			errors.push("user must confirm password");
			passwordConfirmRef.current.focus();
		}

		if (errors.length === 0) {
			const data = {
				name: name,
				email: email,
				password: password,
				passwordConfirm: passwordConfirm,
			};

			Axios.post(`${url}/signup`, data).then((response) => {
				console.log(response);
				if (response.data.status === "success") {
					localStorage.setItem("token", "Bearer " + response.data.token);
					return history.push({
						pathname: "/login",
						state: {
							message: "account created successfully, now please login",
						},
					});
				} else {
					if (response.data.error.name) {
						errors.push(response.data.error.name.message);
						nameRef.current.focus();
					}
					if (response.data.error.email) {
						errors.push(response.data.error.email.message);
						emailRef.current.focus();
					}
					if (response.data.error.password) {
						errors.push(response.data.error.password.message);
						passwordRef.current.focus();
					}
					if (response.data.error.passwordConfirm) {
						errors.push(response.data.error.passwordConfirm.message);
						passwordConfirmRef.current.focus();
					}
					if (response.data.error.emailDuplicate) {
						errors.push(response.data.error.emailDuplicate.message);
						emailRef.current.focus();
					}

					return setErrorMessages(errors);
				}
			});
		} else {
			setErrorMessages(errors);
		}
	};

	const clearErrors = () => {
		setErrorMessages([]);
	};

	//This function will allow user to submit the form by hitting enter keyword
	const handleEnterKeyPress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			signup();
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
				height: "100vh",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					marginTop: 20,
					width: "350px",
					padding: 6,
					border: 2,
					borderBlockColor: "#1b5e20",
					margin: 2,
				}}
			>
				<Typography variant="h4" align="center">
					Registration
				</Typography>
				<TextField
					inputRef={nameRef}
					required
					id="outlined-required"
					label="name"
					value={name}
					sx={{ marginTop: 1 }}
					onChange={(event) => {
						setName(event.target.value);
						clearErrors();
					}}
				/>
				<TextField
					inputRef={emailRef}
					required
					id="outlined-required"
					label="email"
					sx={{ marginTop: 1 }}
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
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
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
						clearErrors();
					}}
				/>
				<TextField
					inputRef={passwordConfirmRef}
					required
					id="outlined-required"
					label="confirm password"
					type={"password"}
					sx={{ marginTop: 1 }}
					value={passwordConfirm}
					onChange={(event) => {
						setPasswordConfirm(event.target.value);
						clearErrors();
					}}
				/>
				<Button
					variant="contained"
					color="success"
					sx={{ marginTop: 1 }}
					onClick={signup}
					onKeyPress={handleEnterKeyPress}
				>
					Create your account
				</Button>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 2,
					}}
				></Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						pt: 1,
					}}
				>
					<Typography>
						Already a member? <Link href="/login"> Log In</Link>
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
					{errorMessages.map((messages, index) => {
						return (
							<Typography color="#FF0000" key={index}>
								{" "}
								{messages}
							</Typography>
						);
					})}
				</Box>
			</Paper>
		</Box>
	);
};

export default Signup;
