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
	const [currentUserChat, setCurrentUserChat] = useState("");
	const [userId, setUserId] = useState("");
	const [chatRoom, setChatRoom] = useState("");
	const [chats, setChats] = useState([]);
	const [chatHistory, setChatHistory] = useState([]);
	Axios.defaults.withCredentials = true;

	useEffect(() => {
		isAuthenticated();
	}, [userId, chatRoom, chatHistory]);

	const isAuthenticated = () => {
		Axios.get("http://localhost:3001/login").then((response) => {
			if (!response.data.loggedIn) {
				return history.push("/");
			}
			setUserId(response.data.user._id);

			Axios.get(`http://localhost:3001/userchats/${userId}`).then(
				(response) => {
					setChats(response.data.data.chatRooms);
				}
			);
		});
	};

	const getCurrentChat = (event) => {
		socket.emit("joined", event.currentTarget.id);
		setChatRoom(event.currentTarget.id);
		setCurrentUserChat(event.currentTarget.innerText);
		getChatHistory(event.currentTarget.id);
	};

	const getChatHistory = (chatRoomID) => {
		Axios.get(`http://localhost:3001/chatRoom/${chatRoomID}/messages`).then(
			(response) => {
				setChatHistory(response.data.data.messages);
			}
		);
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
					<ListChats chats={chats} openChat={getCurrentChat} userId={userId} />
				</Box>
				<Box
					sx={{
						flexGrow: 1,
					}}
				>
					<ChatContainer
						socket={socket}
						userName={currentUserChat}
						userId={userId}
						chatRoom={chatRoom}
						messageHistory={chatHistory}
					/>
				</Box>
			</Box>
		</Layout>
	);
}

export default Chat;
