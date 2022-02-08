import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { List } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function AllItems({ openChat, existingFriends }) {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <ChatBubbleIcon />
        </ListItemIcon>
        <ListItemText primary="Current Chats" />
      </ListItem>
      <Divider />
      <List>
        {existingFriends?.map((friend) => {
          return (
            <ListItem button onClick={openChat}>
              <ListItemText primary={friend.name} />
            </ListItem>
          );
        })}
      </List>
    </List>
  );
}
