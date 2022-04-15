import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

export default function EditDialog({ id }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<MenuItem onClick={handleClickOpen} id={id}>
				<ListItemIcon>
					<EditIcon fontSize="small" />
				</ListItemIcon>
				<Typography variant="inherit">Edit</Typography>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Edit Message</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Edit Message"
							type="email"
							fullWidth
							variant="standard"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleClose}>Subscribe</Button>
					</DialogActions>
				</Dialog>
			</MenuItem>
		</div>
	);
}
