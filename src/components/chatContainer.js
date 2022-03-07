import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ChatContainerHeader from "./chatHeader";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Axios from "axios";

const ChatContainer = ({
	socket,
	userName,
	userId,
	chatRoom,
	messageHistory,
}) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on("recieve-message", (retrieveCurrentChatHistory) => {
			setMessageList(retrieveCurrentChatHistory);
		});
	}, [socket]);

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				From: userId,
				chatRoom: chatRoom,
				message: currentMessage,
			};

			await socket.emit("send-message", messageData);

			Axios.get(`http://localhost:3001/chatRoom/${chatRoom}/messages`).then(
				(response) => {
					setMessageList(response.data.data.messages);
				}
			);
			setCurrentMessage("");
		}
	};
	return (
		<Box sx={{}}>
			<ChatContainerHeader userName={userName} />
			<Box sx={{ height: 550 }}>
				<div>
					{messageList.length !== 0
						? messageList?.map((message, index) => {
								return <p key={index}>{message.message}</p>;
						  })
						: messageHistory?.map((message, index) => {
								return <p key={index}>{message.message}</p>;
						  })}
					{/* {messageHistory?.map((message, index) => {
						return <p key={index}>{message.message}</p>;
					})} */}
				</div>
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
	);
};

export default ChatContainer;
