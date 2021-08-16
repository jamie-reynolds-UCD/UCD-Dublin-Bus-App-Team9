import React, { useState } from "react";
import FinalMap from "../../components/Map/Map";
import RouteDescription from "../../components/RouteDescription/RouteDescription";
import {
  MapRouteContainer,
  RouteInputDirectionsContainer,
} from "../../components/MapRouteContainer/MapRouteContainer.elements";
import Sidebar from "../../components/SideBar/Sidebar";
import { useMediaQuery } from "@material-ui/core";

const Home = ({
  route_object,
  quick_location,
  current_location,
  place_service,
  toggle_display,
  toggle_display_updated,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {" "}
      <MapRouteContainer
        style={isMobile ? { height: "84vh", display: "flex" } : null}
      >
        <RouteInputDirectionsContainer>
          <Sidebar
            quick_location={quick_location}
            current_location={current_location}
            place_service={place_service}
            route_object={route_object}
            toggle_display={toggle_display}
            toggle_display_updated={toggle_display_updated}
          />

          {isMobile ? null : <RouteDescription route_object={route_object} />}
        </RouteInputDirectionsContainer>
        <FinalMap />
      </MapRouteContainer>
    </>
  );
};

export default Home;
