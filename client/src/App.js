import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./components/authentication/Signup";
import ActivateEmail from "./components/authentication/ActivateEmail";
import PleaseClickEmail from "./components/authentication/PleaseClickEmail";
import LoginComp from "./components/landing/Landing";
import Alert from "./components/alert/Alert";
import Container from "react-bootstrap/Container";
import Dashboard from "./components/dashboard/Dashboard";
import UserPage from "./components/user/UserPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import store from "./store";
import { checkUserStillVerified } from "./actions/authentication";
import notfoundmeme from "./404.png";
import Playlist from "./components/dashboard/Playlist"

const NotFound = () => (
  <img style={{ width: "100%" }} src={notfoundmeme} alt='notFound' />
);

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
              <PrivateRoute path='/userpage' component={UserPage} />
              <Route
                exact
                path='/please-click-email'
                component={PleaseClickEmail}
              />
              <Route
                exact
                path='/activate-email/:token'
                component={ActivateEmail}
              />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/playlist' component={Playlist}/>
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      </Router>
    </Provider>
  );
};

export default App;
