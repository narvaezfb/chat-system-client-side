import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "./messageMenu";
import "./../css/style.css";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";

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
			// <div className="message-blue-audio">
			// 	<div className="messageSection">
			// 		<img
			// 			className="imageMessage"
			// 			src={`http://localhost:3001/imageMessages/${image}`}
			// 		/>

			// 		<Menu handleDeleteMessage={handleDeleteMessage} id={id} />
			// 	</div>

			// 	<div className="message-timestamp-left">{time}</div>
			// </div>
			<Box>
				<Box sx={{ display: "flex", justifyContent: "flex-start", margin: 2 }}>
					<Card sx={{ maxWidth: 345, border: 1 }}>
						<CardMedia
							component="img"
							height="250"
							image={`http://localhost:3001/imageMessages/${image}`}
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
						image={`http://localhost:3001/imageMessages/${image}`}
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
