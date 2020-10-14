import React from "react";
import { TextField } from "@material-ui/core";

export default function CustomTextField(props) {
  const { name, type = "text", label, value, error = null, onChange } = props;
  return (
    <TextField
      variant='outlined'
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete='off'
      {...(error && { error: true, helperText: error })}
    />
  );
}
