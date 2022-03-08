import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./chat";
import Login from "./login";
import Profile from "./userProfile";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route path="/user/userProfile">
					<Profile />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
