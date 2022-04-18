import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Cookies from "universal-cookie";

export default function SettingsMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useHistory();
	const cookies = new Cookies();
	const open = Boolean(anchorEl);

	//enable axios credentials
	Axios.defaults.withCredentials = true;

	var url =
		process.env.NODE_ENV === "development"
			? process.env.REACT_APP_LOCALHOST_URL
			: process.env.REACT_APP_BACK_END_URL;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const goToUserProfilePage = () => {
		return history.push("/user/userProfile");
	};

	const logout = () => {
		Axios.get(`${url}/logout`, {
			headers: { Authorization: localStorage.getItem("token") },
		}).then((response) => {
			if (response.data.status === "success") {
				cookies.remove("userId");
				localStorage.removeItem("token");
				return history.push("/");
			}
		});
	};

	return (
		<div>
			<Button
				id="demo-positioned-button"
				aria-controls={open ? "demo-positioned-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				color="inherit"
			>
				<AccountCircleIcon />
			</Button>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuItem onClick={goToUserProfilePage}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
