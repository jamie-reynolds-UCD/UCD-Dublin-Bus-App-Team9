import React, { useState } from "react";
import FinalMap from "../../components/Map/Map";
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
import Sidebar from "../../components/SideBar/Sidebar";

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
            <Sidebar
              quick_location={quick_location}
              current_location={current_location}
              place_service={place_service}
            />
            <RouteDescription route_object={route_object} />
          </RouteInputDirectionsContainer>
          <FinalMap />
        </MapRouteContainer>
        <Weather />
      </div>
    </>
  );
};

export default Home;
