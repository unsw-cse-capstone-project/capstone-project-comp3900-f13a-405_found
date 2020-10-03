import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";

const loginComp = () => (
  <div className='App'>
    <header className='App-header'>

    <div className="row">
          <div className="middle-column">
          <img src={logo} className='App-logo' alt='logo' />
            <h2>UltraCast</h2>
          </div>
          </div>
      
      
    </header>
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={loginComp} />
      </Router>
    </Provider>
  );
};

export default App;
