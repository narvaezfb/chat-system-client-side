import react from "react";
import Speech from "react-speech";
import Menu from "./messageMenu";
import "./../css/style.css";

function Message({
	message,
	time,
	userID,
	fromUser,
	text,
	handleEditMessage,
	handleDeleteMessage,
	handleTextToSpeech,
	id,
	handleEditedMessage,
}) {
	if (userID === fromUser) {
		return (
			<div className="message-blue">
				<div className="messageSection">
					<p className="message-content">{message}</p>
					<Menu
						handleEditMessage={handleEditMessage}
						handleDeleteMessage={handleDeleteMessage}
						handleTextToSpeech={handleTextToSpeech}
						id={id}
						handleEditedMessage={handleEditedMessage}
					/>
				</div>

				<div className="message-timestamp-left">{time}</div>
			</div>
		);
	} else {
		return (
			<div className="message-orange" id={id}>
				<div className="messageSection">
					<p className="message-content">{message}</p>
					<Menu
						handleEditMessage={handleEditMessage}
						handleDeleteMessage={handleDeleteMessage}
						handleTextToSpeech={handleTextToSpeech}
						id={id}
						handleEditedMessage={handleEditedMessage}
					/>
				</div>
				<div className="message-timestamp-right">{time}</div>
			</div>
		);
	}
}

export default Message;
