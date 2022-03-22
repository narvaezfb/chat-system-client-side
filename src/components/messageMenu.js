import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Speech from "react-speech";
import EditMessage from "./editMessage";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const options = ["Edit", "Delete", "Text To Speech"];

const ITEM_HEIGHT = 48;

export default function LongMenu({
	handleEditMessage,
	handleDeleteMessage,
	handleTextToSpeech,
	id,
	handleEditedMessage,
}) {
	const [isOpen, setIsOpen] = React.useState(false);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setIsOpen(false);
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const openDialog = () => {
		setIsOpen(true);
	};
	const closeDialog = () => {
		setIsOpen(false);
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "25ch",
					},
				}}
			>
				<MenuItem onClick={openDialog} id={id}>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Edit</Typography>
					<Dialog open={isOpen} onClose={closeDialog}>
						<DialogTitle>Edit Message</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To edit the current message, please enter the new message here.
								We will edit the message for you.
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Edit Message"
								type="email"
								fullWidth
								variant="standard"
								//value={editedMessage}
								onChange={handleEditedMessage}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={closeDialog}>Cancel</Button>
							<Button
								id={id}
								onClick={(event) => {
									handleEditMessage(event);
									closeDialog();
								}}
							>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
				</MenuItem>
				<MenuItem onClick={handleDeleteMessage} id={id}>
					<ListItemIcon>
						<DeleteIcon fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Delete</Typography>
				</MenuItem>
				<MenuItem
					onClick={(event) => {
						handleTextToSpeech(event);
						closeDialog();
					}}
				>
					<ListItemIcon>
						<PlayArrowIcon fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit" noWrap>
						Text To Speech
					</Typography>
				</MenuItem>
			</Menu>
		</div>
	);
}
