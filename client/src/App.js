import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./components/authentication/Signup";
import LoginComp from "./components/landing/Landing";
import Alert from "./components/alert/Alert";
import Container from "react-bootstrap/Container";



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Alert />
          <Route exact path='/' component={LoginComp} />
          <Route exact path='/signup' component={Signup} />
        </Container>

      </Router>
    </Provider>
  );
};

export default App;
