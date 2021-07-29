import React, { useState } from "react";
import FinalMap from "../../components/Map/Map";
import OriginDestinInput from "../../components/RouteInput/OriginDestinInput";
import RouteDescription from "../../components/RouteDescription/RouteDescription";
import {
  MapRouteContainer,
  RouteInputDirectionsContainer,
} from "../../components/MapRouteContainer/MapRouteContainer.elements";
import Weather from "../../components/Weather/Weather";
import SavedLocationOptions from "../../components/SavedLocations/SavedLocationOptions";
import ActivitiesList from "../../components/Activities/ActivitiesList";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import SpotifyWidget from "../../components/Spotify/SpotifyWidget";

const Home = ({
  route_object,
  quick_location,
  current_location,
  place_service,
}) => {
  const [toggleDisplay, setToggleDisplay] = useState("quicklinks");
  return (
    <>
      {" "}
      <div>
        <MapRouteContainer>
          <RouteInputDirectionsContainer>
            <OriginDestinInput
              quick_location={quick_location}
              current_location={current_location}
            />
            <RouteDescription route_object={route_object} />
          </RouteInputDirectionsContainer>
          <div>
            <ToggleButtonGroup
              value={toggleDisplay}
              onChange={(ev, val) => setToggleDisplay(val)}
              exclusive
            >
              <ToggleButton
                style={{
                  textTransform: "none",
                  minHeight: "0px",
                  minWidth: "0px",
                  padding: "3px",
                }}
                value="quicklinks"
              >
                Quick Links
              </ToggleButton>
              <ToggleButton
                style={{
                  textTransform: "none",
                  minHeight: "0px",
                  minWidth: "0px",
                  padding: "3px",
                }}
                value="savedlocations"
              >
                Saved Locations
              </ToggleButton>
            </ToggleButtonGroup>
            <SavedLocationOptions display={toggleDisplay == "savedlocations"} />
            <ActivitiesList
              place_service={place_service}
              display={toggleDisplay == "quicklinks"}
            />
          </div>
          <FinalMap />
        </MapRouteContainer>
        <Weather />
        <SpotifyWidget />
      </div>
    </>
  );
};

export default Home;
