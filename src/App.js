import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./chat";
import Login from "./login";
import Profile from "./userProfile";
import Signup from "./signup";

function App() {
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
				<Route path="/user/userProfile">
					<Profile />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
