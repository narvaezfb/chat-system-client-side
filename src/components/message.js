import react from "react";
import "./../css/style.css";

function Message({ message, time, userID, fromUser }) {
	if (userID === fromUser) {
		return (
			<div class="message-blue">
				<p class="message-content">{message}</p>
				<div class="message-timestamp-left">{time}</div>
			</div>
		);
	} else {
		return (
			<div class="message-orange">
				<p class="message-content">{message}</p>
				<div class="message-timestamp-right">{time}</div>
			</div>
		);
	}
}

export default Message;
