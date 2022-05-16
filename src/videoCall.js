import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const VideoCall = () => {
	const [peerId, setPeerId] = useState("");
	const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
	const [userId, setUserId] = useState("");
	const history = useHistory();

	//ref values
	const currentUserVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);
	const peerInstance = useRef(null);

	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;

	//axios with default
	Axios.defaults.withCredentials = true;

	useEffect(() => {
		isAuthenticated();
	}, []);

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
						console.log("peer ID", id);
					});

					peer.on("call", (call) => {
						console.log(call);
						var getUserMedia =
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia;

						getUserMedia({ video: true }, (mediaStream) => {
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
				})
				.catch(() => {
					return history.push("/");
				});
		} catch (err) {
			console.log(err);
		}
	};

	const call = (remotePeerId) => {
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

	return (
		<div>
			<input
				value={remotePeerIdValue}
				onChange={(event) => setRemotePeerIdValue(event.target.value)}
			/>
			<button onClick={() => call(remotePeerIdValue)}>call</button>
			<div>
				<video ref={currentUserVideoRef} />
			</div>
			<div>
				<video ref={remoteVideoRef} />
			</div>
		</div>
	);
};

export default VideoCall;
