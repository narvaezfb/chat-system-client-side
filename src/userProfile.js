import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./css/style.css";

const UserInfo = () => {
	const history = useHistory();

	const [userId, setUserId] = useState("");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");

	Axios.defaults.withCredentials = true;

	useEffect(() => {
		isAuthenticated();
		console.log(userId);
	}, [userId]);

	const isAuthenticated = () => {
		Axios.get("http://localhost:3001/login").then((response) => {
			if (!response.data.loggedIn) {
				return history.push("/");
			}
			setName(response.data.user.name);
			setEmail(response.data.user.email);
			setUserId(response.data.user._id);
		});
	};

	const cancelForm = () => {
		return history.push("/chat");
	};

	const submitForm = (event) => {
		event.preventDefault();

		Axios.patch(`http://localhost:3001/user/${userId}`, {
			name: name,
			email: email,
			// password: password,
			// confirmPassword: confirmPassword,
		}).then((response) => {
			console.log(response);
		});
	};

	return (
		<Layout>
			<Box sx={{ display: "flex" }}>
				<Box
					sx={
						{
							// border: 1,
							// width: 700,
							// alignContent: "center",
							// justifyContent: "center",
						}
					}
				>
					<form>
						<TextField
							value={name}
							type="text"
							placeholder="Name"
							sx={{ pl: 3, pr: 3, ml: 35, paddingTop: 5 }}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>

						<br />
						<TextField
							value={email}
							type="email"
							placeholder="Email"
							sx={{ pl: 3, pr: 3, ml: 35, paddingTop: 3 }}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>

						<Box sx={{ display: "flex", mt: 2 }}>
							<Button
								variant="contained"
								color="primary"
								sx={{ pl: 3, pr: 3, ml: 38 }}
								onClick={submitForm}
							>
								Update
							</Button>
							<Button
								variant="contained"
								color="primary"
								sx={{ pl: 3, pr: 3, ml: 1 }}
								onClick={cancelForm}
							>
								Cancel
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</Layout>
	);
};

export default UserInfo;
