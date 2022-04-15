// eslint-disable-next-line no-unused-vars
import react from "react";
// eslint-disable-next-line no-unused-vars
import Speech from "react-speech";
import Menu from "./messageMenu";
import "./../css/style.css";

function AudioMessage({
	audio,
	time,
	userID,
	fromUser,
	text,
	handleDeleteMessage,
	id,
}) {
	if (userID === fromUser) {
		return (
			<div className="message-blue-audio">
				<div className="messageSection">
					<audio
						src={`http://localhost:3001/audioMessages/reproduce/${audio}`}
						controls="controls"
					/>

					<Menu handleDeleteMessage={handleDeleteMessage} id={id} />
				</div>

				<div className="message-timestamp-left">{time}</div>
			</div>
		);
	} else {
		return (
			<div className="message-orange-audio" id={id}>
				<div className="messageSection">
					<audio
						src={`http://localhost:3001/audioMessages/reproduce/${audio}`}
						controls="controls"
					/>

					<Menu handleDeleteMessage={handleDeleteMessage} id={id} />
				</div>
				<div className="message-timestamp-right">{time}</div>
			</div>
		);
	}
}

export default AudioMessage;
