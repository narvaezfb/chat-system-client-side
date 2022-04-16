import React, { useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";

const Signup = () => {
	//state variables for each state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errorMessages, setErrorMessages] = useState([]);

	const history = useHistory();

	const signup = () => {
		setErrorMessages([]);
		const data = {
			name: name,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
		};
		Axios.post("http://localhost:3001/signup", data).then((response) => {
			if (response.data.status === "success") {
				localStorage.setItem("token", "Bearer " + response.data.token);
				return history.push({
					pathname: "/login",
					state: { message: "account created successfully, now please login" },
				});
			} else {
				let errors = [];
				if (response.data.error.name) {
					errors.push(response.data.error.name.message);
				}
				if (response.data.error.email) {
					errors.push(response.data.error.email.message);
				}
				if (response.data.error.password) {
					errors.push(response.data.error.password.message);
				}
				if (response.data.error.passwordConfirm) {
					errors.push(response.data.error.passwordConfirm.message);
				}

				return setErrorMessages(errors);
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
					Create Free Account
				</Typography>
				<TextField
					required
					id="outlined-required"
					label="name"
					value={name}
					sx={{ marginTop: 1 }}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					required
					id="outlined-required"
					label="email"
					sx={{ marginTop: 1 }}
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<TextField
					required
					id="outlined-required"
					label="password"
					type={"password"}
					sx={{ marginTop: 1 }}
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<TextField
					required
					id="outlined-required"
					label="confirm password"
					type={"password"}
					sx={{ marginTop: 1 }}
					value={passwordConfirm}
					onChange={(event) => setPasswordConfirm(event.target.value)}
				/>
				<Button
					variant="contained"
					color="success"
					sx={{ marginTop: 1 }}
					onClick={signup}
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
			</Box>
		</Box>
	);
};

export default Signup;
