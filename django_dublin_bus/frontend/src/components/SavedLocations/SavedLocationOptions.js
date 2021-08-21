import React, { useEffect, useContext, useState } from "react";
import { LoadUserLocations } from "../../Api/ApiFunctions";
import { OptionsContainer } from "./SavedLocations.elements";
import AuthContext from "../Auth/AuthContext";
import SavedLocationButton from "./SavedLocationButton";
import { Typography, Box } from "@material-ui/core";
import Cookies from "universal-cookie";

const SavedLocationOptions = ({ display }) => {
  const [locDetails, setLocDetails] = useState({ saved_locations: [] });

  const cookies = new Cookies();
  let { loggedin } = useContext(AuthContext);

  const LoadLocations = () => {
    let locs = cookies.get("saved_locations");

    if (locs == "") {
      return [];
    }

    if (locs == null) {
      return [];
    } else {
      locs = locs.split("|||");
    }

    let saved_locations = [];

    for (var i = 0; i < locs.length; i++) {
      let split_loc = locs[i].split("***");
      saved_locations.push({
        full_address: split_loc[1],
        location_name: split_loc[0],
        id: i,
      });
    }

    return saved_locations;
  };

  const LoadSavedLocations = () => {
    let locs = LoadLocations();

    setLocDetails({
      ...locDetails,
      saved_locations: locs,
    });
  };

  useEffect(LoadSavedLocations, []);

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
