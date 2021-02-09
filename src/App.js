import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./components/auth/Register";

function App() {
  const state = useContext(AuthContext);
  console.log(state);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />

        {/* <Route path="/userDashboard">
          {!token ? <Redirect to="/login" /> : <UserDashBoard />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/createParcel" component={CreateParcel} />
        <Route path="/editDestination" component={EditPickupDestination} /> */}
      </Switch>
    </div>
  );
}

export default App;
