import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import googleLogo from "./googleLogo.png";

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    boxSizing: "content-box",
    height: 17,
    backgroundColor: "white",
    border: "11px solid white",
    borderRadius: 2,
    marginRight: 12,
  },
  buttonRoot: {
    padding: 2,
    paddingRight: 20,
    paddingLeft: 6,
    backgroundColor: "#4285F4",
    color: "white",
    "&.MuiButton-sizeSmall": {
      paddingLeft: 4,
      paddingRight: 18,
      "& img": {
        height: 16,
        marginRight: 10,
        borderWidth: 10,
      },
    },
    "&.MuiButton-sizeLarge": {
      paddingLeft: 6,
      paddingRight: 24,
      "& img": {
        height: 20,
        marginRight: 16,
        borderWidth: 12,
      },
    },
    "&:hover": {
      backgroundColor: "#182aed",
    },
  },
}));

const GoogleIcon = () => {
  const classes = useStyles();
  return (
    <img className={classes.imageIcon} src={googleLogo} alt="google logo" />
  );
};

const GoogleButton = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        {...props}
        className={classes.buttonRoot}
        startIcon={<GoogleIcon />}
        variant="contained"
      >
        {props.children}
      </Button>
    </div>
  );
};

export default GoogleButton;
