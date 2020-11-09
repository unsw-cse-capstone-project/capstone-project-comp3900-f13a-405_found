import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "25ch",
    paddingBottom: "10px",
  },
}));

export default function CustomTextField(props) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const {
    name,
    type = "text",
    label,
    value,
    error = null,
    onChange,
    passwordViewable = false,
  } = props;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return !passwordViewable ? (
    <TextField
      variant='outlined'
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={classes.textField}
      autoComplete='off'
      {...(error && { error: true, helperText: error })}
    />
  ) : (
    <FormControl
      variant='outlined'
      error={error && error.length > 0 ? true : false}
      className={classes.textField}
    >
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        type={showPassword ? "text" : "password"}
        name='password'
        value={value}
        onChange={onChange}
        {...(error && { error: true })}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
      <FormHelperText id='component-error-text'>{error}</FormHelperText>
    </FormControl>
  );
}
