import React, { useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import { LocationButtonContainer } from "./SavedLocations.elements";
import QuickLocationContext from "./QuickLocationContext";

const SavedLocationButton = ({ loc_obj }) => {
  const { quick_location_updater } = useContext(QuickLocationContext);
  const geocoder = new google.maps.Geocoder();
  const GetCoordinates = (address) => {
    //converts the full address into latitude/longitude coordinates
    const PromiseObject = new Promise((resolve, reject) => {
      //geocode the place id
      geocoder.geocode({ address: address }, (results, status) => {
        if (status == "OK") {
          //resolve the promise with the results
          resolve({
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
          });
        } else {
          reject("Error occurred");
        }
      });
    });
    return PromiseObject;
  };
  const GetLocationCoordinates = async () => {
    let location = null;

    try {
      location = await GetCoordinates(loc_obj.full_address);
      console.log("SETTING THE NEW LOCATION");
      console.log(location);
      quick_location_updater({
        ...location,
        address_string: loc_obj.full_address,
      });
    } catch (error) {}
  };
  return (
    <LocationButtonContainer>
      <Button
        onClick={GetLocationCoordinates}
        variant="contained"
        style={{
          width: "100%",
          color: "white",
          marginTop: "5px",
          backgroundColor: "rgba(75, 89, 247, 1)",
          fontSize: "12px",
        }}
      >
        {loc_obj.location_name}
      </Button>
    </LocationButtonContainer>
  );
};

export default SavedLocationButton;
