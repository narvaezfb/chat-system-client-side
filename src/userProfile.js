import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Message from "./components/message";

const socket = io.connect("http://localhost:3001");

const UserInfo = () => {

	const history = useHistory();
	
	const [userId, setUserId] = useState("");
	
	

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	Axios.defaults.withCredentials = true;

	const isAuthenticated = () => {

		Axios.get("http://localhost:3001/login").then((response) => {
		
		if (!response.data.loggedIn) {
		
		return history.push("/");
		
		}
		
		setUserId(response.data.user._id);
		
		});
		
	};

	useEffect(() => {
		
		isAuthenticated();
		console.log(userId);
	}, [userId, name, email, password, confirmPassword ]);
	
	
	const cancelForm = (event) => {
        event.preventDefault();
        history.back();
    };

	const submitForm = (event) => {
        event.preventDefault();
        
		Axios.patch(`http://localhost:3001/user/${userId}`, {name:name, email:email, password:password, confirmPassword:confirmPassword}).then((response) => {console.log(response)});
       

    
	};	
	
	return (
		<Layout>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flexGrow: 1,
				}}
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
					
					<br />

					<TextField
						value={password}
						type="password"
						placeholder="password"
						sx={{ pl: 3, pr: 3, ml: 35, paddingTop: 3 }}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
						<br />
					<TextField
						value={confirmPassword}
						type="password"
						placeholder="Confirm password"
						sx={{ pl: 3, pr: 3, ml: 35, paddingTop: 3 }}
						onChange={(event) => {
							setConfirmPassword(event.target.value);
						}}
					/>
					<br />
					<br />
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

				</form>
	
			</Box>
		</Layout>
	);
};

export default UserInfo;
