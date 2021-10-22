import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#202846",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc1a28",
      // contrastText: "#fff",
    },
    success: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    background: {
      default: "#141414",
    },
  },
});

export default theme;
