import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const VideoCall = () => {
	const [peerId, setPeerId] = useState("");
	const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
	const currentUserVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);
	const peerInstance = useRef(null);

	useEffect(() => {
		const peer = new Peer();
		peer.on("open", (id) => {
			setPeerId(id);
		});

		peer.on("call", (call) => {
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
	}, []);

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

	console.log(peerId);
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
