import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import notfoundmeme from "./404.png";
import { checkUserStillVerified } from "./actions/authentication";
import "./App.css";
import Alert from "./components/alert/Alert";
import ActivateEmail from "./components/authentication/ActivateEmail";
import Signup from "./components/authentication/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Playlist from "./components/dashboard/Playlist";
import EmailLanding from "./components/landing/EmailLanding";
import LoginComp from "./components/landing/Landing";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import UserPage from "./components/user/UserPage";
import store from "./store";
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
                component={EmailLanding}
              />
              <Route
                exact
                path='/activate-email/:token'
                component={ActivateEmail}
              />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/playlist' component={Playlist} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      </Router>
    </Provider>
  );
};

export default App;
