import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import ListChats from "./components/listChats";
import ChatContainer from "./components/chatContainer";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import ChatContainerHeader from "./components/chatHeader";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { height } from "@mui/system";

const socket = io.connect("http://localhost:3001");

function Chat() {
	const history = useHistory();
	const [currentUserChat, setCurrentUserChat] = useState("");
	const [userId, setUserId] = useState("");
	const [chatRoom, setChatRoom] = useState("");
	const [chats, setChats] = useState([]);
	const [chatHistory, setChatHistory] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");

	Axios.defaults.withCredentials = true;

	useEffect(() => {
		recieveMessage();
		isAuthenticated();
	}, [userId, chatRoom, chatHistory, socket, chats]);

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
		setChatHistory([]);
		socket.emit("joined", event.currentTarget.id);
		setChatRoom(event.currentTarget.id);
		setCurrentUserChat(event.currentTarget.innerText);
		getChatHistory(event.currentTarget.id);
	};

	const getChatHistory = (chatRoomID) => {
		Axios.get(`http://localhost:3001/chatRoom/${chatRoomID}/messages`).then(
			(response) => {
				console.log(response);
				setChatHistory(response.data.data.messages);
			}
		);
	};

	const recieveMessage = () => {
		socket.on("recieve-message", (retrieveCurrentChatHistory) => {
			setChatHistory(retrieveCurrentChatHistory);
		});
	};

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				From: userId,
				chatRoom: chatRoom,
				message: currentMessage,
			};

			await socket.emit("send-message", messageData);

			await Axios.get(
				`http://localhost:3001/chatRoom/${chatRoom}/messages`
			).then((response) => {
				setChatHistory(response.data.data.messages);
			});
			setCurrentMessage("");
		}
	};

	return (
		<Layout>
			{" "}
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flexGrow: 1,
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
						flexDirection: "column",
						flexGrow: 1,
					}}
				>
					<ChatContainerHeader userName={currentUserChat} />
					<Box sx={{ height: 550 }}>
						<Box sx={{ border: 1, p: 5, m: 1, height: 470 }}>
							{chatHistory?.map((message, index) => {
								return <p key={index}>{message.message}</p>;
							})}
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							m: 1,
						}}
					>
						<TextField
							fullWidth
							label="Enter a message.."
							id="fullWidth"
							value={currentMessage}
							onChange={(event) => {
								setCurrentMessage(event.target.value);
							}}
						/>
						<Button
							variant="contained"
							color="success"
							sx={{ pl: 3, pr: 3, ml: 1 }}
							onClick={sendMessage}
						>
							Send
						</Button>
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}

export default Chat;
