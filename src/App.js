import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./chat";
import Login from "./login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Chat">
          <Chat />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
