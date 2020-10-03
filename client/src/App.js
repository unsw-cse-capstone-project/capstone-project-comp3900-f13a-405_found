import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";
import Signup from "./components/authentication/Signup";
import Alert from "./components/alert/Alert";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';



const loginComp = () => (
  <div className='App'>
    <header className='App-header'>

    <div className="row">
          <div className="middle-column">
          <img src={logo} className='App-logo' alt='logo' />
          <Typography variant="h5" gutterBottom> UltraCast </Typography>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" />
            <p></p>
            <Button variant="contained">Log in</Button>
            <p></p>
            <Button variant="contained">Sign up</Button>
          </div>
          </div>
      
      
    </header>
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Alert />
          <Route exact path='/' component={loginComp} />
          <Route exact path='/signup' component={Signup} />
        </Container>

      </Router>
    </Provider>
  );
};

export default App;
