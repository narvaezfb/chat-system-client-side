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
import { useSpeechSynthesis } from "react-speech-kit";
import moment from "moment";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import MicRecorder from "mic-recorder-to-mp3";
import AudioMessage from "./components/audioMessage";
import ImageMessage from "./components/imageMessage";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const socket = io.connect("https://chat-server-347304.nn.r.appspot.com");
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function Chat() {
	const { speak } = useSpeechSynthesis();
	const history = useHistory();
	const [currentUserChat, setCurrentUserChat] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [userId, setUserId] = useState("");
	const [chatRoom, setChatRoom] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [chats, setChats] = useState([]);
	const [chatHistory, setChatHistory] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [editedMessage, setEditedMessage] = useState("");
	const [isRecording, setIsRecording] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [blobURL, setBlobURL] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [messageFormat, setMessageFormat] = useState("text");
	const [selectedFile, setSelectedFile] = useState(null);
	const [isText, setIstText] = useState(true);
	Axios.defaults.withCredentials = true;

	useEffect(() => {
		isAuthenticated();
	}, [userId, chatRoom, chatHistory, chats]); // eslint-disable-line react-hooks/exhaustive-deps

	const isAuthenticated = () => {
		try {
			Axios.get("https://chat-server-347304.nn.r.appspot.com/login", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
				credentials: "include",
				crossDomain: true,
			})
				.then((response) => {
					if (!response.data.loggedIn) {
						return history.push("/");
					}
					setUserId(response.data.user._id);
					if (userId !== "")
						Axios.get(
							`https://chat-server-347304.nn.r.appspot.com/userchats/${userId}`,
							{
								headers: {
									Authorization: localStorage.getItem("token"),
								},
							}
						).then((response) => {
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

		return Axios.post(
			"https://chat-server-347304.nn.r.appspot.com/audioMessages",
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		).then((res) => {
			console.log(res.data.audio.filename);
			const data = {
				message: "audio message",
				chatRoom: chatRoom,
				fromUser: userId,
				messageFormat: "audio",
				audio: res.data.audioMessage._id,
				filename: res.data.audio.filename,
			};

			socket.emit("send-message", data);

			Axios.get(
				`https://chat-server-347304.nn.r.appspot.com/chatRoom/${chatRoom}/messages`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			).then((response) => {
				setChatHistory(response.data.data.messages);
			});

			return setCurrentMessage("");
		});
	};

	const changeStatus = () => {
		setIstText(false);
	};
	const onFileChnage = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const sendImage = () => {
		sendImageFile(selectedFile);
		setSelectedFile(null);
	};
	const sendImageFile = async (imageFile) => {
		let data = new FormData();
		data.append("image", imageFile);
		data.append("chatRoom", chatRoom);
		data.append("fromUser", userId);

		return Axios.post(
			"https://chat-server-347304.nn.r.appspot.com/imageMessages",
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		).then((res) => {
			console.log(res);
			const data = {
				message: "image message",
				chatRoom: chatRoom,
				fromUser: userId,
				messageFormat: "image",
				image: res.data.imageMessage._id,
				filename: res.data.image.filename,
			};

			socket.emit("send-message", data);

			Axios.get(
				`https://chat-server-347304.nn.r.appspot.com/chatRoom/${chatRoom}/messages`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			).then((response) => {
				setChatHistory(response.data.data.messages);
			});
			setIstText(true);
			return setCurrentMessage("");
		});
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
		Axios.get(
			`https://chat-server-347304.nn.r.appspot.com/chatRoom/${chatRoomID}/messages`,
			{
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}
		).then((response) => {
			setChatHistory(response.data.data.messages);
		});
	};

	const recieveMessage = () => {
		socket.on("recieve-message", (retrieveCurrentChatHistory) => {
			console.log(retrieveCurrentChatHistory);
			setChatHistory(retrieveCurrentChatHistory);
		});
	};

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				From: userId,
				chatRoom: chatRoom,
				message: currentMessage,
				messageFormat: messageFormat,
			};

			await socket.emit("send-message", messageData);

			await Axios.get(
				`https://chat-server-347304.nn.r.appspot.com/chatRoom/${chatRoom}/messages`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			).then((response) => {
				setChatHistory(response.data.data.messages);
			});
			return setCurrentMessage("");
		}
	};

	const handleEditMessage = (event) => {
		if (event.currentTarget.id !== "") {
			Axios.patch(
				`https://chat-server-347304.nn.r.appspot.com/messages/${event.currentTarget.id}`,
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
		Axios.delete(
			`https://chat-server-347304.nn.r.appspot.com/messages/${event.currentTarget.id}`,
			{
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}
		).then(() => {
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
									if (message.messageFormat === "text") {
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
									}
									if (message.messageFormat === "audio") {
										// if (message.audio.filename && message.audio.filename !== "")
										return (
											<AudioMessage
												audio={message.filename}
												time={convertDateFormat(message.createdAt)}
												userID={userId}
												fromUser={message.fromUser}
												key={index}
												id={message._id}
												handleDeleteMessage={handleDeleteMessage}
											/>
										);
									}

									if (message.messageFormat === "image") {
										// if (message.audio.filename && message.audio.filename !== "")
										return (
											<ImageMessage
												image={message.filename}
												time={convertDateFormat(message.createdAt)}
												userID={userId}
												fromUser={message.fromUser}
												key={index}
												id={message._id}
												handleDeleteMessage={handleDeleteMessage}
											/>
										);
									}
									return <h1>message</h1>;
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
							<label htmlFor="upload-photo">
								<input
									style={{ display: "none" }}
									id="upload-photo"
									name="upload-photo"
									type="file"
									onChange={onFileChnage}
									onClick={changeStatus}
								/>
								<Fab
									color="primary"
									// size="small"
									component="span"
									// aria-label="add"
								>
									<InsertPhotoIcon />
								</Fab>
							</label>
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
						{isText === true ? (
							<Button
								variant="contained"
								color="success"
								sx={{ pl: 3, pr: 3 }}
								onClick={sendMessage}
							>
								Send
							</Button>
						) : (
							<Button
								variant="contained"
								color="success"
								sx={{ pl: 3, pr: 3 }}
								onClick={sendImage}
							>
								<SendIcon />
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}

export default Chat;
