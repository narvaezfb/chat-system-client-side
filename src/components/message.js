import react from "react";
import "./../css/style.css";

function Message({ message, time, userID, fromUser }) {
	if (userID === fromUser) {
		return (
			<div className="message-blue">
				<p className="message-content">{message}</p>
				<div className="message-timestamp-left">{time}</div>
			</div>
		);
	} else {
		return (
			<div className="message-orange">
				<p className="message-content">{message}</p>
				<div className="message-timestamp-right">{time}</div>
			</div>
		);
	}
}

export default Message;
