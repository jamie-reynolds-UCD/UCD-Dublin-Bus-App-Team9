import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const OriginDestinInput = () => {
  //a state variable which is updated when the user changes the value in the autocomplete menu
  //in the GooglePlacesAutoComplete component there is an onChange parameter which calls the appropriate function

  const geocoder = new google.maps.Geocoder();

  const [placeDetails, setPlaceDetails] = useState({
    origin_address: null,
    destination_address: null,
    origin_coords: null,
    dest_coords: null,
  });

  const GetCoordinates = (place_id) => {
    //when the user chooses a place in the origin / destination an object is returned which has a place id
    //this function uses that place ID to get a latitude/longitude corresponding to that address
    const PromiseObject = new Promise((resolve, reject) => {
      //geocode the place id
      geocoder.geocode({ placeId: place_id }, (results, status) => {
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

  //this is the onChange function for the origin autocomplete
  const updateOriginAddress = async (val) => {
    let coordinates = await GetCoordinates(val.value.place_id);
    //the ...placeDetails just copies over all the other values, but we update the origin_address
    setPlaceDetails({
      ...placeDetails,
      origin_address: val,
      origin_coords: coordinates,
    });
  };

  //this is the onChange function for the destination autocomplete
  const updateDestAddress = async (val) => {
    let coordinates = await GetCoordinates(val.value.place_id);
    setPlaceDetails({
      ...placeDetails,
      destination_address: val,
      dest_coords: coordinates,
    });
  };

  return (
    ///we can style these correctly at a later time I think
    //main thing here is just the GooglePlacesAutoComplete components which are updating the values in placeDetails
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ width: "80px", marginRight: "10px" }}>Origin: </div>
        <div style={{ flex: "1", maxWidth: "300px" }}>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA"
            selectProps={{
              value: placeDetails.origin_address,
              onChange: updateOriginAddress,
            }}
          />
        </div>
      </div>

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ width: "80px", marginRight: "10px" }}>Destination: </div>
        <div style={{ flex: "1", maxWidth: "300px" }}>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA"
            selectProps={{
              value: placeDetails.destination_address,
              onChange: updateDestAddress,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default OriginDestinInput;
