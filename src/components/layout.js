import React from "react";
import Header from "./header";
import { ThemeProvider, Box } from "@mui/material";
import { Theme } from "./../themes/theme";

const Layout = ({ children }) => {
	return (
		<ThemeProvider theme={Theme}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					width: "100vw",
					margin: -1,
				}}
			>
				<Header />
				{children}
			</Box>
		</ThemeProvider>
	);
};

export default Layout;
