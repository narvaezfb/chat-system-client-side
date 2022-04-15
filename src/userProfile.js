import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./css/style.css";

const UserInfo = () => {
	const history = useHistory();

	const [userId, setUserId] = useState("");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;

	Axios.defaults.withCredentials = true;

	useEffect(() => {
		isAuthenticated();
		console.log(userId);
	}, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

	const isAuthenticated = () => {
		try {
			Axios.get(`${url}/login`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
				.then((response) => {
					if (!response.data.loggedIn) {
						return history.push("/");
					}
					setUserId(response.data.user._id);
				})
				.catch(() => {
					return history.push("/");
				});
		} catch (err) {
			console.log(err);
		}
	};

	const cancelForm = () => {
		return history.push("/chat");
	};

	const submitForm = (event) => {
		event.preventDefault();

		Axios.patch(`${url}/user/${userId}`, {
			name: name,
			email: email,
		}).then((response) => {
			console.log(response.data.data.user);

			return history.push("/chat");
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
					<form onSubmit={submitForm}>
						<Box sx={{ display: "flex", mt: 2, mx: 61 }}>
							<h1 sx={{ pl: 390, pr: 300, mx: 100 }}> Update User Profile</h1>
						</Box>
						<TextField
							value={name}
							type="text"
							placeholder="Name"
							sx={{ pl: 3, pr: 3, ml: 60, paddingTop: 5 }}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>

						<br />
						<TextField
							value={email}
							type="email"
							placeholder="Email"
							sx={{ pl: 3, pr: 3, ml: 60, paddingTop: 3 }}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>

						<Box sx={{ display: "flex", mt: 2 }}>
							<Button
								variant="contained"
								color="primary"
								sx={{ pl: 3, pr: 3, ml: 61 }}
								type="submit"
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
