import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import ListChats from "./components/listChats";
import ChatContainer from "./components/chatContainer";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Chat() {
	const history = useHistory();
	const [userFriends, setUserFriends] = useState([]);
	const [messageTo, setMessageTo] = useState();
	const [currentUserChat, setCurrentUserChat] = useState("");

	useEffect(() => {
		isAuthenticated();
	}, []);

	Axios.defaults.withCredentials = true;

	const isAuthenticated = () => {
		Axios.get("http://localhost:3001/login").then((response) => {
			if (!response.data.loggedIn) {
				return history.push("/");
			}

			socket.emit("joined", response.data.user._id);

			Axios.get(
				`http://localhost:3001/users/${response.data.user._id}/friendships`
			).then((response) => {
				setUserFriends(response.data.data.friendships);
			});
		});
	};

	const getCurrentChat = (event) => {
		setMessageTo(event.currentTarget.id);
		setCurrentUserChat(event.currentTarget.innerText);
	};

	return (
		<Layout>
			{" "}
			<Box
				sx={{
					display: "flex",
				}}
			>
				<Box
					sx={{
						width: 300,
						border: 1,
					}}
				>
					<ListChats existingFriends={userFriends} openChat={getCurrentChat} />
				</Box>
				<Box
					sx={{
						flexGrow: 1,
					}}
				>
					<ChatContainer
						socket={socket}
						userName={currentUserChat}
						messageTo={messageTo}
					/>
				</Box>
			</Box>
		</Layout>
	);
}

export default Chat;
