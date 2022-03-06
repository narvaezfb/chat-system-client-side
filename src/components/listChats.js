import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { List } from "@mui/material";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";

export default function AllItems({ openChat, chats, userId, updateChat }) {
	return (
		<List>
			<ListItem button>
				<ListItemIcon>
					<ChatBubbleIcon />
				</ListItemIcon>
				<ListItemText primary="Current Users" />
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
