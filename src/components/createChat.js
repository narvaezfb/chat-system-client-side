import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import UsersList from "./usersList";
import Typography from "@mui/material/Typography";
import Axios from "axios";

export default function CreateChat({ open, handleClose }) {
	const [contacts, setContacts] = React.useState([]);

	React.useEffect(() => {
		Axios.get(`http://localhost:3001/users`).then((response) => {
			console.log(response.data.data.users);
			setContacts(response.data.data.users);
		});
	}, []);
	return (
		<div>
			<Dialog open={open} onClose={handleClose} sx={{}}>
				<DialogTitle>New Chat</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Please select a new contact you want to chat with:
					</Typography>
					<UsersList />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Add</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
