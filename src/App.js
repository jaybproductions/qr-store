import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

//Route Imports
import Home from "./pages/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Forgot from "./Auth/Forgot";

import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
import Header from "./components/Header";
import SingleQR from "./components/SingleQr";
import QrCode from "./components/qrCode";

function App() {
  const [user, setUser] = useAuth();
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />

        <Switch>
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/user/:userId/code/:codeId" component={SingleQR} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
