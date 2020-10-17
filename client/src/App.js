import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Signup from "./components/authentication/Signup";
import LoginComp from "./components/landing/Landing";
import Alert from "./components/alert/Alert";
import Container from "react-bootstrap/Container";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import store from "./store";
import { checkUserStillVerified } from "./actions/authentication";
import LogoutButton from "./components/LogoutButton";
import notfoundmeme from "./404.png";

const NotFound = () => <img style={{ width: "100%" }} src={notfoundmeme} />;

const App = () => {
  useEffect(() => {
    store.dispatch(checkUserStillVerified());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Container>
            <Alert />
            <Switch>
              <Route exact path='/' component={LoginComp} />
              <Route exact path='/signup' component={Signup} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      </Router>
    </Provider>
  );
};

export default App;
