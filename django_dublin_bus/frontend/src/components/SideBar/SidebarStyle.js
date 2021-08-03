import { makeStyles } from "@material-ui/core";

const SidebarStyle = makeStyles({
  TabButtonSelected: {
    backgroundColor: "white",
    color: "#101522",
    width: "100px",
    borderRadius: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    marginBottom: "5px",
  },

  TabButtonNotSelected: {
    backgroundColor: "#101522",
    color: "white",
    width: "100px",
    borderRadius: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    marginBottom: "5px",
  },

  DisplaySection: { padding: "8px" },

  HideSection: {
    width: "0px",
    height: "0px",
    overflow: "hidden",
  },

  toggle_option_selected: {
    flex: 1,
    "&:hover": {
      cursor: "pointer",
    },
    color: "#4B59F7",
    textAlign: "center",
  },

  toggle_option_not_selected: {
    flex: 1,
    "&:hover": {
      cursor: "pointer",
    },
    color: "white",
    backgroundColor: "#101522",
    textAlign: "center",
  },
});

export default SidebarStyle;
