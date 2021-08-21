import { createMuiTheme } from "@material-ui/core/styles";

const font = "'Quicksand', 'sans-serif'";

const breakpoints = {
  mobile: 400,
  tablet: 600,
};

const Theme = createMuiTheme({ typography: { fontFamily: font } });

Theme.typography.body1 = {
  fontFamily: font,

  [Theme.breakpoints.down(breakpoints.tablet)]: {
    fontSize: "13px",
  },
  [Theme.breakpoints.down(breakpoints.mobile)]: {
    fontSize: "12px",
  },
};

Theme.typography.caption = {
  fontFamily: font,

  [Theme.breakpoints.down(breakpoints.tablet)]: {
    fontSize: "12px",
  },

  [Theme.breakpoints.down(breakpoints.mobile)]: {
    fontSize: "13px",
  },
};

Theme.typography.button = {
  fontFamily: font,
  button: {
    textTransform: "none",
    color: "white",
  },
  [Theme.breakpoints.down(breakpoints.tablet)]: {
    fontSize: "12px",
  },
};

export default Theme;
