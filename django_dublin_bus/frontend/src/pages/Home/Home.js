import React from "react";
import FinalMap from "../../components/Map/Map";
import OriginDestinInput from "../../components/RouteInput/OriginDestinInput";
import RouteDescription from "../../components/RouteDescription/RouteDescription";
import {
  MapRouteContainer,
  RouteInputDirectionsContainer,
} from "../../components/MapRouteContainer/MapRouteContainer.elements";

const Home = ({ route_object }) => {
  return (
    <>
      {" "}
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapRouteContainer>
          <RouteInputDirectionsContainer>
            <OriginDestinInput />
            <RouteDescription route_object={route_object} />
          </RouteInputDirectionsContainer>

          <FinalMap />
        </MapRouteContainer>
      </div>
    </>
  );
};

export default Home;
