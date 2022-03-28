import React, { useEffect, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import Axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Audio() {
	const [isRecording, setIsRecording] = useState(false);
	const [blobURL, setBlobURL] = useState("");
	const [isBlocked, setIsBlocked] = useState(false);
	const [listAudios, setListAudios] = useState([]);

	useEffect(() => {
		console.log(listAudios);
	}, [listAudios]);

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
				var wavfromblob = new File([blob], "incomingaudioclip.mp3", {
					type: "audio/mpeg",
				});
				console.log(wavfromblob);

				setBlobURL(blobURL);
				console.log(blobURL);
				setIsRecording(false);
				sendAudioFile(wavfromblob);
				setListAudios((list) => [...list, blobURL]);
			})
			.catch((e) => console.log(e));
	};

	const sendAudioFile = async (url) => {
		let data = new FormData();
		data.append("User", "622788b02f28b849da923637");
		data.append("message", "hola bebe");
		data.append("chatRoom", "622eae4bc8929f0a04007e4f");
		data.append("audio", url);
		return await Axios.post("http://localhost:3001/messages/", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((res) => {
			console.log(res);
			return res;
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={startRecording}>Record</button>
				<button onClick={stopRecording}>Stop</button>

				{listAudios?.map((audio, index) => {
					return <audio src={audio} controls="controls" />;
				})}
			</header>
		</div>
	);
}
