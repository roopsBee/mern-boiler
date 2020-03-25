import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      button: {
        color: "red",
        backgroundColor: "green",
        "&$selected": {
          backgroundColor: "blue"
        },
        "&:hover": {
          color: "purple",
          backgroundColor: "pink"
        }
      }
    }
  },
  palette: {
    primary: deepPurple,
    secondary: green
  }
});
export default theme;
