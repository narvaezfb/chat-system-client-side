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
	const [message, setMessage] = useState("");
	const history = useHistory();

	const signup = () => {
		const data = {
			name: name,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
		};
		Axios.post("http://localhost:3001/signup", data).then((response) => {
			console.log(response.data.status);
			if (response.data.status) {
				localStorage.setItem("token", "Bearer " + response.data.token);
				return history.push("/login");
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
				>
					{/* <Typography color="#FF0000"> {message}</Typography> */}
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Typography>
						Already a member? <Link href="/login"> Log In</Link>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Signup;
