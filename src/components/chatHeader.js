import React from "react";
import Box from "@mui/material/Box";

import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";
const ChatContainer = ({ userName }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-start",
				p: 1,
				m: 1,
				border: 1,
			}}
		>
			<Box>
				<PersonIcon />
			</Box>
			<Box sx={{ ml: 2 }}>
				<Typography>{userName}</Typography>
			</Box>
		</Box>
	);
};

export default ChatContainer;
