import { Typography, Box } from "@material-ui/core";
import React from "react";
import ActivityOption from "./ActivityOption";
import { OptionsContainer } from "./Activities.elements";
import {
  faShoppingBasket,
  faUtensils,
  faGlassCheers,
  faDonate,
  faEnvelope,
  faHiking,
} from "@fortawesome/free-solid-svg-icons";

let activities = [
  "Groceries",
  "Restaurants",
  "Pubs",
  "Banks",
  "Post Office",
  "Outdoor Walks",
];

let activity_icons = {
  Groceries: faShoppingBasket,
  Restaurants: faUtensils,
  Pubs: faGlassCheers,
  Banks: faDonate,
  "Post Office": faEnvelope,
  "Outdoor Walks": faHiking,
};

const ActivitiesList = ({ place_service, display }) => {
  return (
    <OptionsContainer
      style={
        display == false
          ? { width: "0px", height: "0px", overflow: "hidden" }
          : null
      }
    >
      {activities.map((activity) => (
        <ActivityOption
          activity_object={activity}
          place_service={place_service}
          icon={activity_icons[activity]}
        />
      ))}
    </OptionsContainer>
  );
};

export default ActivitiesList;
