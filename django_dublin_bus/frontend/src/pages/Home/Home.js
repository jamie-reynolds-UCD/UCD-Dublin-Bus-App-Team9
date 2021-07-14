import React from "react";
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

const Home = ({
  route_object,
  quick_location,
  current_location,
  place_service,
}) => {
  return (
    <>
      {" "}
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapRouteContainer>
          <RouteInputDirectionsContainer>
            <OriginDestinInput
              quick_location={quick_location}
              current_location={current_location}
            />
            <RouteDescription route_object={route_object} />
          </RouteInputDirectionsContainer>
          <div>
            <SavedLocationOptions />
            <ActivitiesList place_service={place_service} />
          </div>
          <FinalMap />
        </MapRouteContainer>
        <Weather />
      </div>
    </>
  );
};

export default Home;
