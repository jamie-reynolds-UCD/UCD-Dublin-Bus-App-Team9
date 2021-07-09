import React from "react";
import { Box, Typography } from "@material-ui/core";

const SavedLocation = ({ loc }) => {
  return (
    <Box
      border={1}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderColor: "rgba(0, 0, 0, 0.4)",
        borderTop: "0px",
        borderLeft: "0px",
        borderRight: "0px",
      }}
    >
      <Box
        style={{
          width: "30%",
          borderRight: "1px solid rgba(0, 0, 0, 0.4)",

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(75, 89, 247, 0.8)",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            color: "white",
          }}
        >
          {loc.location_name}
        </Typography>
      </Box>
      <Box style={{ width: "70%", padding: "10px" }}>
        <Typography>{loc.full_address}</Typography>
      </Box>
    </Box>
  );
};

export default SavedLocation;
