import React, { useState, useContext } from "react";
import MapContext from "../Map/MapContext";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GetRoute } from "../../Api/ApiFunctions";
import Button from "@material-ui/core/Button";
import { InputContainer } from "./OriginDestinInput.elements";

const OriginDestinInput = () => {
  //access this function which allows us to update the markers that are rendered on the application
  const { setMapDetails } = useContext(MapContext);

  const geocoder = new google.maps.Geocoder();
  //a state variable which is updated when the user changes the value in the autocomplete menu
  //in the GooglePlacesAutoComplete component there is an onChange parameter which calls the appropriate function
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

  const UpdateRoute = async () => {
    let response = await GetRoute({
      origin_coords: placeDetails.origin_coords,
      dest_coords: placeDetails.dest_coords,
    });

    if (response.status == 200) {
      let start_markers = response.data.route.map((leg) => leg.start_location);

      let end_markers = response.data.route.map((leg) => leg.end_location);

      let all_markers = start_markers.concat(end_markers);

      let polylines = response.data.route.map((leg) =>
        google.maps.geometry.encoding.decodePath(leg.polyline.points)
      );

      setMapDetails({
        markers: all_markers,
        polylines: polylines,
        route_object: response.data.route,
        route_bounds: response.data.route_bounds,
      });
    }
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
      <InputContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80px", marginRight: "10px" }}>Origin: </div>
          <div style={{ flex: "1", maxWidth: "300px" }}>
            <GooglePlacesAutocomplete
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ie"],
                },
                bounds: [
                  { lat: 53.25569243978568, lng: -6.406385543048432 },
                  { lat: 53.410686449776236, lng: -6.1557599287484654 },
                ],
                strictBounds: true,
              }}
              apiKey="AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA"
              selectProps={{
                value: placeDetails.origin_address,
                onChange: updateOriginAddress,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80px", marginRight: "10px" }}>
            Destination:{" "}
          </div>
          <div style={{ flex: "1", maxWidth: "300px" }}>
            <GooglePlacesAutocomplete
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ie"],
                },
                bounds: [
                  { lat: 53.25569243978568, lng: -6.406385543048432 },
                  { lat: 53.410686449776236, lng: -6.1557599287484654 },
                ],
                strictBounds: true,
              }}
              apiKey="AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA"
              selectProps={{
                value: placeDetails.destination_address,
                onChange: updateDestAddress,
              }}
            />
          </div>
        </div>
        <Button variant="contained" onClick={() => UpdateRoute()}>
          Plan Route
        </Button>
      </InputContainer>
    </>
  );
};

export default OriginDestinInput;
