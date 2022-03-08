import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UsersList from "./usersList";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreateChat({ open, handleClose, userID1 }) {
	const [contacts, setContacts] = React.useState([]);
	const [personName, setPersonName] = React.useState("");
	const [contactId, setContactId] = React.useState("");
	const history = useHistory();
	Axios.defaults.withCredentials = true;

	React.useEffect(() => {
		getListOfUsers();
		console.log("contact id", contactId);
	}, [personName, contactId]);

	const getListOfUsers = () => {
		Axios.get(`http://localhost:3001/users`).then((response) => {
			setContacts(response.data.data.users);
		});
	};

	const handleChange = (event) => {
		setPersonName(event.target.value);
		setContactId(event.target.value);
	};

	const CreateNewChat = () => {
		const userID2 = contactId;
		if (userID1 !== "" && userID2 !== "") {
			const data = {
				userID1: userID1,
				userID2: userID2,
			};
			Axios.post("http://localhost:3001/chatRooms", data).then((response) => {
				handleClose();
				return history.push("/chat");
			});
		}
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose} sx={{}}>
				<DialogTitle>New Chat</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Please select a new contact you want to chat with:
					</Typography>
					<UsersList
						contacts={contacts}
						personName={personName}
						contactId={contactId}
						handleChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={CreateNewChat}>Add</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
