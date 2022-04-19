import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Container, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import "./css/style.css";
import blankUserPhoto from "./media/blank-profile.png";
import { Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Profile = () => {
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
			<Box
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box sx={{ display: "flex", width: "80%", border: 1, marginTop: 10 }}>
					<Box sx={{ display: "flex", flexDirection: "column", p: 1, m: 1 }}>
						<Paper elevation={2} sx={{ width: 300, p: 1, m: 1 }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									mb: 2,
								}}
							>
								<img src={blankUserPhoto} width="250px"></img>
							</Box>
							<Box sx={{ mb: 2 }}>
								<Typography> User Name</Typography>
							</Box>

							<Typography>
								{" "}
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book.
							</Typography>

							<Paper
								variant="outlined"
								square
								sx={{
									display: "flex",
									width: 240,
									alignItems: "center",
									justifyContent: "space-around",
									marginTop: 2,
									p: 1,
								}}
							>
								<Typography> Status: </Typography>
								<Button color="success" sx={{ border: 1 }}>
									Active
								</Button>
							</Paper>
						</Paper>
					</Box>
					<Box sx={{ p: 1, m: 1 }}>
						<Paper
							sx={{
								display: "flex",
								flexDirection: "column",

								pt: 1,
								m: 1,
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									gap: 2,
									ml: 2,
								}}
							>
								<PersonIcon />
								<Typography>About</Typography>
							</Box>
							<Box sx={{ display: "flex", flexDirection: "row", mb: 3 }}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										gap: 1,
										mt: 3,
										pl: 2,
										pr: 2,
									}}
								>
									<Typography>First Name</Typography>
									<Typography>Gender </Typography>
									<Typography>Country</Typography>
									<Typography>Email Address</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										gap: 1,
										mt: 3,
										pl: 2,
										pr: 2,
									}}
								>
									<Typography>Fabian</Typography>
									<Typography>Male </Typography>
									<Typography>Canada</Typography>
									<Typography>narvaezfb4@hotmail.com</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										gap: 1,
										mt: 3,
										pl: 2,
										pr: 2,
									}}
								>
									<Typography>Last Name</Typography>
									<Typography>Contact No. </Typography>
									<Typography>Address</Typography>
									<Typography>Birthday</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										gap: 1,
										mt: 3,
										pl: 2,
										pr: 2,
									}}
								>
									<Typography>Narvaez</Typography>
									<Typography>+1 647 563 5190 </Typography>
									<Typography>773 Oshawa blvd N</Typography>
									<Typography>May 4, 1999</Typography>
								</Box>
							</Box>
						</Paper>
					</Box>
				</Box>
			</Box>
		</Layout>
	);
};

export default Profile;
