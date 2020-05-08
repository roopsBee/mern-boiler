import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import githubMark from "./GitHubMark.png";

// small height 40
// medium height 44
// large height 48

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    boxSizing: "content-box",
    height: 24,
    backgroundColor: "black",
    border: "10px solid black",
    borderRadius: 5,
    marginRight: 10,
  },
  buttonRoot: {
    padding: 0,
    paddingRight: 20,
    backgroundColor: "#1d1f1d",
    color: "white",
    "&.MuiButton-sizeSmall": {
      paddingRight: 18,
      "& img": {
        height: 22,
        marginRight: 8,
        borderWidth: 9,
      },
    },
    "&.MuiButton-sizeLarge": {
      paddingRight: 22,
      "& img": {
        height: 26,
        marginRight: 12,
        borderWidth: 11,
      },
    },
    "&:hover": {
      backgroundColor: "#303330",
    },
  },
  logo: {
    height: "inherit",
  },
}));

const GithubIcon = () => {
  const classes = useStyles();

  return (
    <img className={classes.imageIcon} src={githubMark} alt="Github logo" />
  );
};

const MyGithubButton = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        {...props}
        className={classes.buttonRoot}
        startIcon={<GithubIcon />}
        variant="contained"
      >
        {props.children}
      </Button>
    </div>
  );
};
export default MyGithubButton;
