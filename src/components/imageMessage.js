import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Menu from "./messageMenu";
import "./../css/style.css";
import Box from "@mui/material/Box";

function ImageMesssage({
	image,
	time,
	userID,
	fromUser,
	text,
	handleDeleteMessage,
	id,
}) {
	if (userID === fromUser) {
		return (
			<Box>
				<Box sx={{ display: "flex", justifyContent: "flex-start", margin: 2 }}>
					<Card sx={{ maxWidth: 345, border: 1 }}>
						<CardMedia
							component="img"
							height="250"
							image={`https://chat-server-347304.nn.r.appspot.com/imageMessages/${image}`}
						/>
						<CardActions sx={{ justifyContent: "flex-end" }}>
							<Typography sx={{ fontSize: 12 }}>{time}</Typography>
							<Menu handleDeleteMessage={handleDeleteMessage} id={id} />
						</CardActions>
					</Card>
				</Box>
			</Box>
		);
	} else {
		return (
			<Box sx={{ display: "flex", justifyContent: "flex-end", margin: 2 }}>
				<Card sx={{ maxWidth: 345, border: 1 }}>
					<CardMedia
						component="img"
						height="250"
						image={`https://chat-server-347304.nn.r.appspot.com/imageMessages/${image}`}
					/>
					<CardActions sx={{ justifyContent: "flex-end" }}>
						<Typography sx={{ fontSize: 12 }}>{time}</Typography>
						<Menu handleDeleteMessage={handleDeleteMessage} id={id} />
					</CardActions>
				</Card>
			</Box>
		);
	}
}

export default ImageMesssage;
