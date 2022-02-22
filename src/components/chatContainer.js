import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ChatContainerHeader from "./chatHeader";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const ChatContainer = ({ socket, userName, messageTo }) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on("recieve-message", (data) => {
			console.log(data);
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				messageTo: messageTo,
				message: currentMessage,
			};

			await socket.emit("send-message", messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage("");
		}
	};
	return (
		<Box sx={{}}>
			<ChatContainerHeader userName={userName} userId={messageTo} />
			<Box sx={{ height: 550 }}>
				<div>
					{messageList?.map((message, index) => {
						return <p key={index}>{message.message}</p>;
					})}
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
