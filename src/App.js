import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserDashBoard from "./components/userDashboard/UserDashBoard";
import CreateParcel from "./components/parcel/CreateParcel";
import EditPickupDestination from "./components/parcel/EditPickupDestination";

function App() {
  const {
    state: { isAuthenticated, token },
    loadUser,
  } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/createParcel" component={CreateParcel} />

        <Route path="/userDashboard">
          {!token ? <Redirect to="/login" /> : <UserDashBoard />}
        </Route>
        <Route path="/editDestination" component={EditPickupDestination} />
      </Switch>
    </div>
  );
}

export default App;
