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
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import moment from "moment";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { ReactMediaRecorder } from "react-media-recorder";
import MicRecorder from "mic-recorder-to-mp3";

const socket = io.connect("http://localhost:3001");
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function Chat() {
	const { speak } = useSpeechSynthesis();
	const history = useHistory();
	const [currentUserChat, setCurrentUserChat] = useState("");
	const [userId, setUserId] = useState("");
	const [chatRoom, setChatRoom] = useState("");
	const [chats, setChats] = useState([]);
	const [chatHistory, setChatHistory] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [editedMessage, setEditedMessage] = useState("");
	const [isRecording, setIsRecording] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);
	const [blobURL, setBlobURL] = useState("");

	Axios.defaults.withCredentials = true;

	useEffect(() => {
		// recieveMessage();
		isAuthenticated();
	}, [userId, chatRoom, chatHistory, socket, chats]);

	const checkPermissions = () => {
		navigator.getUserMedia(
			{ audio: true },
			() => {
				console.log("access granted");
				setIsBlocked(false);
			},
			() => {
				console.log("access denied");
				setIsBlocked(true);
			}
		);
	};

	const startRecording = () => {
		checkPermissions();
		if (isBlocked) {
			console.log("Permission Denied");
		} else {
			Mp3Recorder.start()
				.then(() => {
					setIsRecording(true);
				})
				.catch((e) => console.error(e));
		}
	};

	const stopRecording = () => {
		Mp3Recorder.stop()
			.getMp3()
			.then(([buffer, blob]) => {
				console.log(blob);
				const blobURL = URL.createObjectURL(blob);
				var audioFile = new File([blob], "audio-message.mp3", {
					type: "audio/mpeg",
				});
				console.log(audioFile);

				setBlobURL(blobURL);
				console.log(blobURL);
				setIsRecording(false);
				sendAudioFile(audioFile);
				// setListAudios((list) => [...list, blobURL]);
			})
			.catch((e) => console.log(e));
	};

	const sendAudioFile = async (file) => {
		let data = new FormData();
		data.append("audio", file);
		data.append("chatRoom", chatRoom);
		data.append("fromUser", userId);
		return await Axios.post("http://localhost:3001/audioMessages/5", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
			console.log(res);
			return res;
		});
	};

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
		socket.disconnect();
		socket.connect();
		setChatHistory([]);
		socket.emit("joined", event.currentTarget.id);
		setChatRoom(event.currentTarget.id);
		setCurrentUserChat(event.currentTarget.innerText);
		getChatHistory(event.currentTarget.id);
		recieveMessage();
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
		const date = new Date();
		const dateFormated = moment(date).format("MMMM Do YYYY, h:mm:ss a");

		if (currentMessage !== "") {
			const messageData = {
				From: userId,
				chatRoom: chatRoom,
				message: currentMessage,
			};

			await socket.emit("send-message", messageData);

			// if (chatHistory.length !== 0) {
			// 	setChatHistory((list) => [...list, messageData]);
			// 	return setCurrentMessage("");
			// }

			await Axios.get(`http://localhost:3001/chatRoom/${chatRoom}/messages`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}).then((response) => {
				setChatHistory(response.data.data.messages);
			});
			return setCurrentMessage("");
		}
	};

	const handleEditMessage = (event) => {
		if (event.currentTarget.id !== "") {
			Axios.patch(
				`http://localhost:3001/messages/${event.currentTarget.id}`,
				{ message: editedMessage },
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			).then((response) => {
				console.log(response);
				getChatHistory(chatRoom);
			});
		}
	};
	const handleDeleteMessage = (event) => {
		Axios.delete(`http://localhost:3001/messages/${event.currentTarget.id}`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		}).then(() => {
			getChatHistory(chatRoom);
		});
	};

	const handleEditedMessage = (event) => {
		setEditedMessage(event.target.value);
	};

	const convertDateFormat = (date) => {
		return moment(date).format("MMMM Do YYYY, h:mm:ss a");
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
											time={convertDateFormat(message.createdAt)}
											userID={userId}
											fromUser={message.fromUser}
											key={index}
											id={message._id}
											text={message.message}
											handleEditMessage={handleEditMessage}
											handleDeleteMessage={handleDeleteMessage}
											handleTextToSpeech={() =>
												speak({ text: message.message })
											}
											handleEditedMessage={handleEditedMessage}
											editedMessage={editedMessage}
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
							mt: 2,
							gap: 1,
							// alignContent: "center",
							// justifyItems: "center",
							// justifyContent: "center",
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

						<Box
							sx={{
								display: "flex",

								gap: 1,
								// borderColor: "primary",
							}}
						>
							<Button
								sx={{ borderRadius: 1, border: 1 }}
								onClick={startRecording}
							>
								<MicIcon />
							</Button>
							{isRecording === true ? (
								<Button
									sx={{ borderRadius: 1, border: 1 }}
									onClick={stopRecording}
								>
									<StopIcon />
								</Button>
							) : null}
						</Box>

						<Button
							variant="contained"
							color="success"
							sx={{ pl: 3, pr: 3 }}
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
