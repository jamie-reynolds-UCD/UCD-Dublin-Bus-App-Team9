import React, { useState, useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GetRoute } from "../../Api/ApiFunctions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { InputContainer } from "./OriginDestinInput.elements";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Typography } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import QuickLocationContext from "../SavedLocations/QuickLocationContext";

const OriginDestinInput = ({ quick_location, current_location }) => {
  //access this function which allows us to update the markers that are rendered on the application
  const { setMapDetails } = useContext(MapContext);

  const { toggle_display_updater, trigger_toggle_update } =
    useContext(QuickLocationContext);

  const ismobile = useMediaQuery("(max-width:600px)");

  const geocoder = new google.maps.Geocoder();
  //a state variable which is updated when the user changes the value in the autocomplete menu
  //in the GooglePlacesAutoComplete component there is an onChange parameter which calls the appropriate function
  const [placeDetails, setPlaceDetails] = useState({
    origin_address: null,
    destination_address: null,
    origin_coords: null,
    dest_coords: null,
  });

  const GetTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  let default_date = GetTodaysDate();

  const [timeDetails, setTimeDetails] = useState({
    date: default_date,
    chosentime: null,
    use_now: true,
  });

  const SetDestinationToQuickLocation = () => {
    try {
      if (quick_location.latitude != null) {
        setPlaceDetails({
          ...placeDetails,
          destination_address: {
            label: quick_location.address_string,
            value: {},
          },
          dest_coords: {
            latitude: quick_location.latitude,
            longitude: quick_location.longitude,
          },
        });

        if ((quick_location.date == null) | (quick_location.time == null)) {
          setTimeDetails({
            ...timeDetails,
            date: default_date,
            chosentime: null,
            use_now: true,
          });
        } else {
          setTimeDetails({
            ...timeDetails,
            date: quick_location.date,
            chosentime: quick_location.time.substring(0, 5),
            use_now: false,
          });
        }

        UpdateRoute(
          {
            latitude: quick_location.latitude,
            longitude: quick_location.longitude,
          },
          quick_location.address_string,
          quick_location.date,
          quick_location.time ? quick_location.time.substring(0, 5) : "now"
        );
      }
    } catch (error) {}
  };

  const SetOriginToCurrentLocation = () => {
    if (current_location.latitude != null) {
      setPlaceDetails({
        ...placeDetails,
        origin_address: { label: "Current Location", value: {} },
        origin_coords: current_location,
      });
    }
  };

  //any time the quick location changes set it as the destination in the route planner
  useEffect(SetDestinationToQuickLocation, [quick_location]);
  useEffect(SetOriginToCurrentLocation, [current_location]);

  const GetTimeNow = () => {
    var now = new Date();
    var HH = String(now.getHours()).padStart(2, "0");
    var MM = String(now.getMinutes() + 1).padStart(2, "0");

    now = HH + ":" + MM;

    return now;
  };

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

  const UpdateRoute = async (dest_coords, destination_address, date, time) => {
    try {
      let response = await GetRoute({
        origin_coords:
          placeDetails.origin_coords != null
            ? placeDetails.origin_coords
            : {
                latitude: current_location.latitude,
                longitude: current_location.longitude,
              },
        dest_coords:
          dest_coords != null ? dest_coords : placeDetails.dest_coords,
        origin_string: placeDetails.origin_address
          ? placeDetails.origin_address.label
          : "Current Location",
        destination_string:
          destination_address != null
            ? destination_address
            : placeDetails.destination_address.label,
        time: time
          ? time
          : timeDetails.use_now
          ? "now"
          : timeDetails.chosentime,
        date: date ? date : timeDetails.date,
        arrive_at: date ? 1 : 0,
      });

      if (response.status == 200) {
        let old_route = [...response.data.route];

        response.data.route.splice(response.data.route.length - 2, 2);

        response.data.route.shift();

        let start_markers = response.data.route.map(
          (leg) => leg.start_location
        );

        let end_markers = response.data.route.map((leg) => leg.end_location);

        let all_markers = [];

        /*for (var i = 0; i < start_markers.length; i += 2) {
          all_markers.push(start_markers[i]);
          all_markers.push(end_markers[i]);
        }*/

        all_markers.push(start_markers[0]);
        all_markers.push(end_markers[0]);

        for (var i = 0; i < end_markers.length; i++) {
          all_markers.push(end_markers[i]);
        }

        let polylines = response.data.route.map((leg) => {
          return {
            travelmode: leg.travel_mode,
            path: google.maps.geometry.encoding.decodePath(leg.polyline.points),
          };
        });

        setMapDetails({
          markers: all_markers,
          polylines: polylines,
          route_object: old_route,
          route_bounds: response.data.route_bounds,
        });

        if (destination_address != null) {
          setPlaceDetails({
            ...placeDetails,
            destination_address: {
              label: destination_address,
              value: {},
            },
            dest_coords: dest_coords,
            origin_address: {
              label: placeDetails.origin_address
                ? placeDetails.origin_address.label
                : "Current Location",
              value: {},
            },
          });
        }

        if (time == "now") {
          setTimeDetails({
            ...timeDetails,
            date: default_date,
            chosentime: null,
            use_now: true,
          });
        }

        toggle_display_updater("description");

        trigger_toggle_update();
      }
    } catch (error) {
      console.log("Error");
      console.log(error);
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
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginBottom: "10px",
          }}
        >
          {ismobile ? null : (
            <Typography variant="h6" style={{ color: "#4B59F7" }}>
              Route Planner
            </Typography>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "80px", marginRight: "10px" }}>
            <Typography>Origin:</Typography>{" "}
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
                value: placeDetails.origin_address,
                onChange: updateOriginAddress,
                placeholder: "Enter Origin",
                components: {
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                },
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <div style={{ width: "80px", marginRight: "10px" }}>
            <Typography>Destination:</Typography>
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
                placeholder: "Enter Destination",
                components: {
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                },
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <div style={{ width: "80px", marginRight: "10px" }}>
            <Typography>Trip Date:</Typography>
          </div>
          <TextField
            style={{ flex: "1", maxWidth: "300px" }}
            id="date"
            type="date"
            value={timeDetails.date}
            onChange={(value) => {
              let use_now = timeDetails.use_now;
              let chosentime = timeDetails.chosentime;
              if (value != GetTodaysDate()) {
                if (use_now) {
                  use_now = false;
                  chosentime = "12:00";
                }
              }
              setTimeDetails({
                ...timeDetails,
                date: value.target.value,
                use_now: use_now,
                chosentime: chosentime,
              });
            }}
            defaultValue={default_date}
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <div style={{ width: "80px", marginRight: "10px" }}>
            <Typography>Trip Time:</Typography>
          </div>

          <ToggleButtonGroup
            style={{ flex: "1", maxWidth: "300px" }}
            exclusive
            value={timeDetails.use_now ? "now" : "choosetime"}
            onChange={(e, value) => {
              if (value == "now") {
                //if the user chooses "now" then set use_now to true and set the date to today's date
                setTimeDetails({
                  ...timeDetails,
                  use_now: true,
                  date: GetTodaysDate(),
                });

                return;
              }

              //otherwise if the user chooses "Choose Time" set the default time to now if it is currently null
              let default_time = timeDetails.chosentime;

              if (default_time == null) {
                default_time = GetTimeNow();
              }
              setTimeDetails({
                ...timeDetails,
                use_now: false,
                chosentime: default_time,
              });
            }}
          >
            <ToggleButton
              style={{ padding: "3px", textTransform: "none" }}
              value="now"
            >
              Now
            </ToggleButton>
            <ToggleButton
              style={{ padding: "3px", textTransform: "none" }}
              value="choosetime"
            >
              Choose Time
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {timeDetails.use_now ? null : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "5px",
            }}
          >
            <div style={{ width: "80px", marginRight: "10px" }}></div>
            <TextField
              style={{ flex: "1", maxWidth: "300px" }}
              id="time"
              label="Time"
              type="time"
              value={timeDetails.chosentime}
              onChange={(value) =>
                setTimeDetails({
                  ...timeDetails,
                  chosentime: value.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
        )}

        <Button
          variant="contained"
          onClick={() => UpdateRoute()}
          variant="contained"
          style={{
            backgroundColor: "#4B59F7",
            color: "white",
            textTransform: "none",
            marginTop: "15px",
          }}
        >
          Plan Route
        </Button>
      </InputContainer>
    </>
  );
};

export default OriginDestinInput;
