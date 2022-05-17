import React, { useEffect, useState, useRef } from "react";
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
import MicRecorder from "mic-recorder-to-mp3";
import AudioMessage from "./components/audioMessage";
import ImageMessage from "./components/imageMessage";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Logo from "./media/logo-v1.png";
import CreateChat from "./components/createChat";
import DeleteIcon from "@mui/icons-material/Delete";
import AudioIcon from "./media/audio-wave.gif";
import Peer from "peerjs";

var socket;
if (process.env.NODE_ENV === "development") {
	socket = io.connect(process.env.REACT_APP_LOCALHOST_URL);
} else {
	socket = io.connect(process.env.REACT_APP_BACK_END_URL);
}

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function Chat() {
	//state variables
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
	// eslint-disable-next-line no-unused-vars
	const [isBlocked, setIsBlocked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [blobURL, setBlobURL] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [messageFormat, setMessageFormat] = useState("text");
	const [selectedFile, setSelectedFile] = useState(null);
	const [isText, setIstText] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	//peer ID
	const [remotePeerId, setRemotePeerId] = useState(null);
	const [isVideoCall, setIsVideoCall] = useState(false);

	//ref variables
	const inputChatRef = useRef();
	const peerInstance = useRef(null);
	const currentUserVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);

	//axios with default
	Axios.defaults.withCredentials = true;

	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;

	useEffect(() => {
		isAuthenticated();
	}, [userId, chatRoom, chatHistory, socket, chats]); // eslint-disable-line react-hooks/exhaustive-deps

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

					const peer = new Peer(response.data.user._id);

					peer.on("open", (id) => {
						console.log("peer", id);
					});

					peer.on("call", (call) => {
						var getUserMedia =
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia;

						getUserMedia({ video: true }, (mediaStream) => {
							setIsVideoCall(true);
							currentUserVideoRef.current.srcObject = mediaStream;
							currentUserVideoRef.current.play();

							call.answer(mediaStream);
							call.on("stream", (remoteStream) => {
								remoteVideoRef.current.srcObject = remoteStream;
								remoteVideoRef.current.play();
							});
						});
					});

					peerInstance.current = peer;

					if (userId !== "") {
						Axios.get(`${url}/userchats/${userId}`, {
							headers: {
								Authorization: localStorage.getItem("token"),
							},
						}).then((response) => {
							if (
								response.data.status === "This user does not have any chats "
							) {
								console.log("this user does not have any chats");
							} else {
								setChats(response.data.data.chatRooms);
							}
						});
					}
				})
				.catch(() => {
					return history.push("/");
				});
		} catch (err) {
			console.log(err);
		}
	};

	//VIDEO CHAT HANDLING
	const call = () => {
		setIsVideoCall(true);
		var getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia;

		getUserMedia({ video: true }, (mediaStream) => {
			currentUserVideoRef.current.srcObject = mediaStream;
			currentUserVideoRef.current.play();
			var call = peerInstance.current.call(remotePeerId, mediaStream);
			call.on("stream", (remoteStream) => {
				remoteVideoRef.current.srcObject = remoteStream;
				remoteVideoRef.current.play();
			});
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
		getRemotePeerId(event.currentTarget.id);
		recieveMessage();
	};

	const getRemotePeerId = (chatRoomID) => {
		Axios.get(`${url}/chatRooms/${chatRoomID}`, {
			// headers: {
			// 	Authorization: localStorage.getItem("token"),
			// },
		}).then((response) => {
			console.log("chatRoom ID", response.data.data.chatRoom);
			if (response.data.data.chatRoom.userID1 === userId) {
				setRemotePeerId(response.data.data.chatRoom.userID2);
			} else {
				setRemotePeerId(response.data.data.chatRoom.userID1);
			}
		});

		console.log("remote Peer ID", remotePeerId);
	};

	const getChatHistory = (chatRoomID) => {
		Axios.get(`${url}/chatRoom/${chatRoomID}/messages`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		}).then((response) => {
			console.log(response);
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

			await Axios.get(`${url}/chatRoom/${chatRoom}/messages`, {
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
				`${url}/messages/${event.currentTarget.id}`,
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
		Axios.delete(`${url}/messages/${event.currentTarget.id}`, {
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

	const handleClose = () => {
		setIsOpen(false);
	};

	// AUDIO HANDLING

	// const checkPermissions = () => {
	// 	navigator.getUserMedia(
	// 		{ audio: true },
	// 		() => {
	// 			console.log("access granted");
	// 			setIsBlocked(false);
	// 		},
	// 		() => {
	// 			console.log("access denied");
	// 			setIsBlocked(true);
	// 		}
	// 	);
	// };

	//more code

	const startRecording = () => {
		// checkPermissions();
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
	const cancelRecording = () => {
		Mp3Recorder.stop();
		setIsRecording(false);
	};

	const sendAudioFile = async (file) => {
		let data = new FormData();
		data.append("audio", file);
		data.append("chatRoom", chatRoom);
		data.append("fromUser", userId);

		return Axios.post(`${url}/audioMessages`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
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

			Axios.get(`${url}/chatRoom/${chatRoom}/messages`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}).then((response) => {
				setChatHistory(response.data.data.messages);
			});

			return setCurrentMessage("");
		});
	};

	//IMAGE HANLDING
	const onFileChange = (event) => {
		if (event.target.value.length === 0) {
			console.log("no file has been selected");
		} else {
			console.log("file has been selected");
			setSelectedFile(event.target.files[0]);
			setIstText(false);
		}
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

		return Axios.post(`${url}/imageMessages`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
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

			Axios.get(`${url}/chatRoom/${chatRoom}/messages`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}).then((response) => {
				setChatHistory(response.data.data.messages);
			});
			setIstText(true);
			return setCurrentMessage("");
		});
	};

	return (
		<Layout>
			<Box
				sx={{
					display: "flex",
					backgroundColor: "primary.main",
					flexGrow: 1,
				}}
			>
				<Box
					sx={{
						width: 300,
						border: 1,
						borderColor: "secondary.main",
					}}
				>
					<ListChats chats={chats} openChat={getCurrentChat} userId={userId} />
				</Box>
				{chatRoom !== "" ? (
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							flexGrow: 1,
							border: 1,
							borderColor: "secondary.main",
						}}
					>
						<ChatContainerHeader userName={currentUserChat} call={call} />
						{/* <input
							value={remotePeerIdValue}
							onChange={(event) => setRemotePeerIdValue(event.target.value)}
						/> */}

						{isVideoCall === false ? (
							<Box
								sx={{
									border: 1,
									borderColor: "secondary.main",
									m: 1,
									pt: 1,
									flexGrow: 1,
								}}
							>
								<Scrollbars style={{}}>
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
						) : (
							<div>
								<div>
									<video ref={currentUserVideoRef} />
								</div>
								<div>
									<video ref={remoteVideoRef} />
								</div>
							</div>
						)}

						<Box
							sx={{
								display: "flex",
								m: 1,
								gap: 1,
							}}
						>
							<TextField
								fullWidth
								label="Enter a message.."
								id="fullWidth"
								color="secondary"
								inputRef={inputChatRef}
								focused
								InputProps={{ style: { color: "#e0f7fa" } }}
								value={currentMessage}
								onChange={(event) => {
									setCurrentMessage(event.target.value);
								}}
							/>

							<Box
								sx={{
									display: "flex",
									gap: 1,
								}}
							>
								<label htmlFor="upload-photo">
									<input
										style={{ display: "none" }}
										id="upload-photo"
										name="upload-photo"
										type="file"
										onChange={onFileChange}
									/>
									<Fab color="secondary" component="span">
										<InsertPhotoIcon />
									</Fab>
								</label>
								<Button
									sx={{ borderRadius: 1, border: 1, borderColor: "green.main" }}
									onClick={startRecording}
								>
									<MicIcon color="green" />
								</Button>
								{isRecording === true ? (
									<Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
										<Button
											sx={{
												borderRadius: 1,
												border: 1,
												borderColor: "red.main",
											}}
											onClick={cancelRecording}
										>
											<DeleteIcon color="red" />
										</Button>
										<Button
											variant="outlined"
											color="green"
											sx={{ pl: 1, pr: 1, color: "#fff" }}
										>
											<img src={AudioIcon} alt="audio recording" width="25px" />
										</Button>
										<Button
											sx={{
												borderRadius: 1,
												border: 1,
												borderColor: "green.main",
											}}
											onClick={() => {
												stopRecording();
											}}
										>
											<SendIcon color="green" />
										</Button>
									</Box>
								) : null}
							</Box>
							{isText === true && isRecording === false ? (
								<Button
									variant="contained"
									color="green"
									sx={{ pl: 3, pr: 3, color: "#fff" }}
									onClick={sendMessage}
								>
									Send
								</Button>
							) : null}
							{isText === false && isRecording === false ? (
								<Button
									variant="contained"
									color="green"
									sx={{ pl: 3, pr: 3 }}
									onClick={sendImage}
								>
									<SendIcon color="primary.light" />
								</Button>
							) : null}
						</Box>
					</Box>
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							flexGrow: 1,
						}}
					>
						<img
							src={Logo}
							width="100px"
							height="100px"
							position="center"
							alt="logo"
						/>
						<Button
							color="green"
							variant="outlined"
							sx={{ mt: 2 }}
							onClick={() => {
								setIsOpen(true);
							}}
						>
							Start new chat
						</Button>
						<CreateChat
							open={isOpen}
							handleClose={handleClose}
							userID1={userId}
						/>
					</Box>
				)}
			</Box>
		</Layout>
	);
}

export default Chat;
