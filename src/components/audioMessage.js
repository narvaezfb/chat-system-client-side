// eslint-disable-next-line no-unused-vars
import react from "react";
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
	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;
	if (userID === fromUser) {
		return (
			<div className="message-blue-audio">
				<div className="messageSection">
					<audio
						src={`${url}/audioMessages/reproduce/${audio}`}
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
						src={`${url}/audioMessages/reproduce/${audio}`}
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
