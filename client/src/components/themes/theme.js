import { createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      button: {
        color: "red",
        backgroundColor: "cyan",
        "&$selected": {
          backgroundColor: "green",
        },
        "&:hover": {
          color: "red",
          backgroundColor: "green",
        },
      },
    },
  },
  palette: {
    primary: red,
    secondary: blue,
  },
});
export default theme;
