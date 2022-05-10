import React from "react";
import Header from "./header";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./../themes/theme";

const Layout = ({ children }) => {
	return (
		<ThemeProvider theme={Theme}>
			<Header />
			{children}
		</ThemeProvider>
	);
};

export default Layout;
