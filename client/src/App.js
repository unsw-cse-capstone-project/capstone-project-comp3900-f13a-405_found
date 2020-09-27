import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/authentication/Signup";
import Alert from "./components/alert/Alert";
import Container from "react-bootstrap/Container";

const testToSeeIfItWorks = () => (
  <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className='App-link'
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn React
      </a>
    </header>
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Alert />
          <Route exact path='/' component={testToSeeIfItWorks} />
          <Route exact path='/signup' component={Signup} />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
