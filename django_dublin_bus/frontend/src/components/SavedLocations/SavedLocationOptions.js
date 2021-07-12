import React, { useEffect, useContext, useState } from "react";
import { LoadUserLocations } from "../../Api/ApiFunctions";
import { OptionsContainer } from "./SavedLocations.elements";
import AuthContext from "../Auth/AuthContext";
import SavedLocationButton from "./SavedLocationButton";
import { Typography, Box } from "@material-ui/core";

const SavedLocationOptions = () => {
  const [locDetails, setLocDetails] = useState({ saved_locations: [] });
  let { loggedin } = useContext(AuthContext);

  const LoadSavedLocations = async () => {
    let response = await LoadUserLocations();

    if (response.status == 200) {
      setLocDetails({
        ...locDetails,
        saved_locations: response.data.locations,
      });
    }
  };

  useEffect(LoadSavedLocations, []);

  let display = loggedin & (locDetails.saved_locations.length > 0);

  return (
    <OptionsContainer
      style={
        display ? null : { width: "0px", height: "0px", overflow: "hidden" }
      }
    >
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
        }}
      >
        <Typography style={{ color: "white", fontSize: "14px" }}>
          Locations
        </Typography>
      </Box>
      {locDetails.saved_locations.map((location) => (
        <SavedLocationButton loc_obj={location} />
      ))}
    </OptionsContainer>
  );
};

export default SavedLocationOptions;
