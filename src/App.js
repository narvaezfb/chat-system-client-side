import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./chat";
import Login from "./login";
import Profile from "./profile";
import Signup from "./signup";
import Account from "./account";

function App() {
	useEffect(() => {
		document.title = "Live Chat";
	}, []);
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/account">
					<Account />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
