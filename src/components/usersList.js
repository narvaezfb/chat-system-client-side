import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(contact, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(contact.name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function ContactSelection({ contacts }) {
	const theme = useTheme();
	const [personName, setPersonName] = React.useState("");
	const [contactId, setContactId] = React.useState("");
	Axios.defaults.withCredentials = true;

	React.useEffect(() => {
		console.log("contact id:", contactId);
	}, [personName, contactId]);

	const handleChange = (event) => {
		setPersonName(event.target.value);
		setContactId(event.target.value);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 500 }}>
				<InputLabel>Name</InputLabel>
				<Select
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput label="Name" />}
					MenuProps={MenuProps}
				>
					{contacts?.map((contact, index) => (
						<MenuItem
							key={index}
							value={contact._id}
							style={getStyles(contact.name, personName, theme)}
						>
							{contact.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
