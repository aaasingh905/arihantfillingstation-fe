import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      padding: "10px  12px 8px 12px",
      marginRight: "15px",
    },
    // customize padding here
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
      {
        "-webkit-appearance": "none",
        marginRight: "10px",
      },
    "& .MuiFormControl-root": {
      marginRight: "50px !important",
    },
    marginRight: "10px",
  },
}));

function CustomTextField(props) {
  const classes = useStyles();

  return <TextField className={classes.root} variant="outlined" {...props} />;
}

export default CustomTextField;
