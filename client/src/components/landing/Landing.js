import React from "react";
import logo from "./logo.png";
import "./Landing.css";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';


const handleSubmit = e => {
    e.preventDefault()
    if (true){
        //<Redirect to='/dashboard' />
    }
}

const LoginComp = () => (
  <div className='App'>
    <header className='App-header'>

    <div className="row">
          <div className="middle-column">
          <img src={logo} className='App-logo' alt='logo' />
          <Typography variant="h5" gutterBottom> UltraCast </Typography>
          <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" />
            <p></p>
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <p></p>
            <Button variant="contained">Log in</Button>
            <Button variant="contained" href="/signup" >Sign up</Button>
            </form>
          </div>
          </div>
    </header>
  </div>
);

export default LoginComp;