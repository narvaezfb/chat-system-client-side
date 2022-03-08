import React from "react";
import Header from "./header";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
	return (
		<Box>
			<Header />
			{children}
		</Box>
	);
};

export default Layout;
