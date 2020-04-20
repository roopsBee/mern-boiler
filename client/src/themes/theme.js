import { createMuiTheme } from "@material-ui/core/styles";
import { red, blue, yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: red[700] },
    secondary: { main: blue[600] },
    text: { primary: "#fafafa" },
    error: yellow,
  },
  overrides: {
    MuiListItem: {
      button: {
        color: "#000000",
        backgroundColor: blue[600],
        "&$selected": {
          "&:hover": {
            backgroundColor: red[900],
          },
          color: "#fafafa",
          backgroundColor: red[700],
        },
        "&:hover": {
          color: "#fafafa",
          backgroundColor: red[900],
        },
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: red[700],
      },
    },
    MuiPaper: { root: { backgroundColor: red[700] } },
    MuiInputLabel: {
      root: {
        color: "white",
        "&$focused": {
          color: "white",
        },
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid ${blue[600]}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: "1px solid white",
        },
        "&:after": {
          borderBottom: `2px solid ${blue[600]}`,
        },
      },
    },
  },
});
export default theme;
