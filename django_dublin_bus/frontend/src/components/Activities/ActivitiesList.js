import { Typography, Box } from "@material-ui/core";
import React from "react";
import ActivityOption from "./ActivityOption";
import { OptionsContainer } from "./Activities.elements";

let activities = ["Groceries"];

const ActivitiesList = ({ place_service }) => {
  return (
    <OptionsContainer>
      <Box
        boxShadow={2}
        borderRadius={8}
        style={{
          padding: "8px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "rgba(16, 21, 34, 0.7)",
          maxWidth: "150px",
          marginTop: "15px",
        }}
      >
        {" "}
        <Typography style={{ color: "white" }}>Activities</Typography>
      </Box>

      {activities.map((activity) => (
        <ActivityOption
          activity_object={activity}
          place_service={place_service}
        />
      ))}
    </OptionsContainer>
  );
};

export default ActivitiesList;
