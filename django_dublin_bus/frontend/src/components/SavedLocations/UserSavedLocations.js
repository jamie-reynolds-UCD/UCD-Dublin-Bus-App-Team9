import React, { useEffect, useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { LoadUserLocations, SaveNewLocation } from "../../Api/ApiFunctions";
import SavedLocation from "./SavedLocation";
import { Box } from "@material-ui/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CenteredDivContainser,
  EditBackground,
  EditContainer,
  HorizontalDiv,
  InputRowContainer,
} from "./SavedLocations.elements";
import Cookies from "universal-cookie";

const UserSavedLocations = ({ display }) => {
  const [locDetails, setLocDetails] = useState({ saved_locations: [] });

  const [ShowEdit, setShowEdit] = useState(false);

  const cookies = new Cookies();

  const [NewLocationDetails, setNewLocationDetails] = useState({
    location_name: null,
    full_address: null,
    location_name_error: false,
    full_address_error: false,
  });

  const generate_cookie_string = (location_name, location_address) => {
    return location_name.concat("***").concat(location_address);
  };

  const SaveNewLocationCookie = (loc_details) => {
    let current_cookies = cookies.get("saved_locations");

    current_cookies = current_cookies ? current_cookies : "";

    if (current_cookies == "") {
      current_cookies = generate_cookie_string(
        loc_details.location_name,
        loc_details.full_address
      );
    } else {
      current_cookies = current_cookies
        .concat("|||")
        .concat(
          generate_cookie_string(
            loc_details.location_name,
            loc_details.full_address
          )
        );
    }

    cookies.set("saved_locations", current_cookies, { path: "/" });
  };

  const SaveLocation = async () => {
    if (
      (NewLocationDetails.location_name == null) |
      (NewLocationDetails.location_name == "")
    ) {
      setNewLocationDetails({
        ...NewLocationDetails,
        location_name_error: true,
        full_address_error: false,
      });
      return;
    }

    if (
      (NewLocationDetails.full_address == null) |
      (NewLocationDetails.full_address == "")
    ) {
      setNewLocationDetails({
        ...NewLocationDetails,
        full_address_error: true,
        location_name_error: false,
      });
      return;
    }

    //await SaveNewLocation(NewLocationDetails);

    SaveNewLocationCookie(NewLocationDetails);

    LoadSavedLocations();
  };

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
    let saved_locations = LoadLocations();

    setLocDetails({
      ...locDetails,
      saved_locations: saved_locations,
    });

    setShowEdit(false);
  };

  useEffect(LoadSavedLocations, []);

  return (
    <div style={{ zIndex: "100000" }}>
      <Box
        border={display ? 1 : 0}
        borderRadius={5}
        style={
          display == false
            ? {
                width: "0px",
                height: "0px",
                overflow: "hidden",
                width: "90%",
              }
            : {
                width: "90%",
                margin: "auto",
                borderColor: "rgba(0, 0, 0, 0.5)",

                marginTop: "15px",
              }
        }
      >
        <Box
          style={{
            width: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
            backgroundColor: "rgba(16, 21, 34, 0.4)",
          }}
        >
          <Typography style={{ color: "white" }}>Saved Locations</Typography>
        </Box>
        {locDetails.saved_locations.map((location) => (
          <SavedLocation key={location.id} loc={location} />
        ))}
        <CenteredDivContainser>
          <Button onClick={() => setShowEdit(true)}>
            {" "}
            <Typography style={{ color: "rgba(75, 89, 247, 0.8)" }}>
              {" "}
              <FontAwesomeIcon style={{ fontSize: "18px" }} icon={faPlus} /> Add
              Location
            </Typography>
          </Button>
        </CenteredDivContainser>
        <EditBackground
          style={
            ShowEdit == false
              ? { height: "0px", width: "0px", overflow: "hidden" }
              : { zIndex: "100000" }
          }
        >
          <EditContainer
            style={
              ShowEdit == false
                ? { height: "0px", width: "0px", overflow: "hidden" }
                : null
            }
          >
            <Box
              borderRadius={5}
              boxShadow={1}
              style={{ backgroundColor: "white", padding: "10px" }}
            >
              <HorizontalDiv>
                <Typography
                  variant="h6"
                  style={{ color: "rgba(75, 89, 247, 0.8)" }}
                >
                  Add Location
                </Typography>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button onClick={() => setShowEdit(false)}>
                    <Typography style={{ color: "rgba(75, 89, 247, 0.8)" }}>
                      <FontAwesomeIcon
                        style={{ fontSize: "20px" }}
                        icon={faWindowClose}
                      />
                    </Typography>
                  </Button>
                </div>
              </HorizontalDiv>
              <InputRowContainer>
                <Typography style={{ width: "150px" }}>
                  Full Address:{" "}
                </Typography>
                <TextField
                  error={NewLocationDetails.full_address_error !== false}
                  label="Full address"
                  style={{ flex: 1 }}
                  onChange={(e) => {
                    setNewLocationDetails({
                      ...NewLocationDetails,
                      full_address: e.target.value,
                    });
                  }}
                ></TextField>
              </InputRowContainer>
              <InputRowContainer>
                <Typography style={{ width: "150px" }}>
                  Location Name:{" "}
                </Typography>
                <TextField
                  error={NewLocationDetails.location_name_error !== false}
                  label="Location name"
                  style={{ flex: 1 }}
                  onChange={(e) => {
                    setNewLocationDetails({
                      ...NewLocationDetails,
                      location_name: e.target.value,
                    });
                  }}
                ></TextField>
              </InputRowContainer>
              <HorizontalDiv style={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={SaveLocation}
                  style={{
                    color: "white",
                    marginTop: "15px",
                    backgroundColor: "rgba(75, 89, 247, 0.8)",
                  }}
                >
                  Save Location
                </Button>
              </HorizontalDiv>
            </Box>
          </EditContainer>
        </EditBackground>
      </Box>
    </div>
  );
};

export default UserSavedLocations;
