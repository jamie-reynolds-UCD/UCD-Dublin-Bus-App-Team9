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

const UserSavedLocations = ({ display }) => {
  const [locDetails, setLocDetails] = useState({ saved_locations: [] });

  const [ShowEdit, setShowEdit] = useState(false);

  const [NewLocationDetails, setNewLocationDetails] = useState({
    location_name: null,
    full_address: null,
    location_name_error: false,
    full_address_error: false,
  });

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

    await SaveNewLocation(NewLocationDetails);

    LoadSavedLocations();
  };

  const LoadSavedLocations = async () => {
    let response = await LoadUserLocations();
    if (response.status == 200) {
      setLocDetails({
        ...locDetails,
        saved_locations: response.data.locations,
      });
    }

    setShowEdit(false);
  };

  useEffect(LoadSavedLocations, []);

  return (
    <Box
      border={1}
      borderRadius={5}
      style={
        display == false
          ? {
              width: "0px",
              height: "0px",
              overflow: "hidden",
              width: "90%",
              margin: "auto",
              borderColor: "rgba(0, 0, 0, 0.5)",

              marginTop: "15px",
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
            : null
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
              <Typography style={{ width: "150px" }}>Full Address: </Typography>
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
  );
};

export default UserSavedLocations;
