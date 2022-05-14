import React from "react";
import Box from "@mui/material/Box";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import VideoCallIcon from "@mui/icons-material/VideoCall";

import { Typography } from "@mui/material";

const ChatContainer = ({ userName }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				p: 1,
				m: 1,
				border: 1,
				borderColor: "secondary.main",
			}}
		>
			<Box sx={{ display: "flex" }}>
				<Box>
					<PersonIcon color="green" />
				</Box>
				<Box sx={{ ml: 2 }}>
					<Typography color={"primary.light"}>{userName}</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",

					justifyContent: "space-between",
					alignContent: "center",
					width: "65px",
					mr: 2,
				}}
			>
				<CallIcon color="green" />
				<VideoCallIcon color="green" sx={{}} />
			</Box>
		</Box>
	);
};

export default ChatContainer;
