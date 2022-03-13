import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Button, List } from "@mui/material";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import CreateChat from "./createChat";

export default function AllItems({ openChat, chats, userId, updateChat }) {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {}, [userId, chats]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<List>
			<ListItem button>
				<ListItemIcon>
					<ChatBubbleIcon />
				</ListItemIcon>
				<ListItemText primary="Current Chats" />
				<Button sx={{ border: 1, color: "#212121" }} onClick={handleClickOpen}>
					<AddIcon />
				</Button>
				<CreateChat open={open} handleClose={handleClose} userID1={userId} />
			</ListItem>
			<Divider />
			<List>
				{chats?.map((chat) => {
					return (
						<ListItem
							button
							onClick={openChat}
							key={chat._id}
							id={chat._id}
							onChange={updateChat}
						>
							<PersonIcon sx={{ mr: 2 }} />
							<ListItemText
								primary={
									chat.userID2._id === userId
										? chat.userID1.name
										: chat.userID2.name
								}
							/>
						</ListItem>
					);
				})}
			</List>
		</List>
	);
}
