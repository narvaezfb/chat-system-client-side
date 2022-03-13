import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "./components/layout";
import ListChats from "./components/listChats";
import ChatContainerHeader from "./components/chatHeader";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Message from "./components/message";
import { Scrollbars } from "react-custom-scrollbars-2";

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
		try {
			Axios.get("http://localhost:3001/login", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
				.then((response) => {
					if (!response.data.loggedIn) {
						return history.push("/");
					}
					setUserId(response.data.user._id);

					Axios.get(`http://localhost:3001/userchats/${userId}`, {
						headers: {
							Authorization: localStorage.getItem("token"),
						},
					}).then((response) => {
						setChats(response.data.data.chatRooms);
					});
				})
				.catch(() => {
					return history.push("/");
				});
		} catch (err) {
			console.log(err);
		}
	};

	const getCurrentChat = (event) => {
		setChatHistory([]);
		socket.emit("joined", event.currentTarget.id);
		setChatRoom(event.currentTarget.id);
		setCurrentUserChat(event.currentTarget.innerText);
		getChatHistory(event.currentTarget.id);
	};

	const getChatHistory = (chatRoomID) => {
		Axios.get(`http://localhost:3001/chatRoom/${chatRoomID}/messages`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		}).then((response) => {
			setChatHistory(response.data.data.messages);
		});
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

			await Axios.get(`http://localhost:3001/chatRoom/${chatRoom}/messages`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}).then((response) => {
				setChatHistory(response.data.data.messages);
			});
			setCurrentMessage("");
		}
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
				<Box
					sx={{
						width: 300,
						border: 1,
						display: "flex",
						flexDirection: "column",
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
						<Box sx={{ border: 1, m: 1, height: 545, pt: 1 }}>
							<Scrollbars style={{ height: 500 }}>
								{chatHistory?.map((message, index) => {
									return (
										<Message
											message={message.message}
											time={message.createdAt}
											userID={userId}
											fromUser={message.fromUser}
											key={index}
										/>
									);
								})}
							</Scrollbars>
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
