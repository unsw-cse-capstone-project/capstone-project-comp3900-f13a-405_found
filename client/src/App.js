import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./components/authentication/Signup";
import LoginComp from "./components/landing/Landing";
import Alert from "./components/alert/Alert";
import Container from "react-bootstrap/Container";
import Dashboard from "./components/dashboard/Dashboard";
import store from "./store";
import { checkUserStillVerified } from "./actions/authentication";

const App = () => {
  useEffect(() => {
    store.dispatch(checkUserStillVerified());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Alert />
          <Route exact path='/' component={LoginComp} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
