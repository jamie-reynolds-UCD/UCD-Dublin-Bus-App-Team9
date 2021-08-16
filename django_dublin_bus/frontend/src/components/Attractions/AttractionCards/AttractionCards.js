import React, { useState, useEffect, useContext } from "react";
import jsonData from "./attractionlist.json";
import TouristMap from "../TouristMap/TouristMap";
import {
  LoadButton,
  LoadButtonCont,
  TagButton,
  TagButtons,
} from "./AttractionCards.elements";
import {
  WholeCard,
  CardWrapper,
  CardBody,
  CardImage,
  CardTitle,
  CardLocation,
  CardTags,
  Buttons,
  Divider,
} from "./Card.elements";
import { Link } from "react-router-dom";
import SelectedCard from "./SelectedCard";
import QuickLocationContext from "../../SavedLocations/QuickLocationContext";
import { FaRoute, FaMapPin, FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@material-ui/core";

export default function AttractionCards() {
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(4);
  const [showResults, setShowResults] = useState(false);

  //Load more cards
  const loadMore = () => {
    setVisible(visible + 8);
  };

  useEffect(() => {
    tagList;
  }, []);

  //Filterting the entire list of attractions
  const tagList = jsonData.filter((attraction) => {
    return (
      attraction.tags.toLowerCase().includes(tag.toLowerCase()) &&
      attraction.name.toLowerCase().includes(name.toLowerCase())
    );
  });

  //On click of tag button, set conditions
  const handleClick = (tag) => {
    setTag(tag);
    setVisible(8);
    setName("");
    setShowResults(false);
  };

  //Reset list of attractions to all
  function ResetList() {
    setName("");
    setVisible(8);
    setShowResults(false);
  }

  //View single attraction on maap
  function ViewOnMap(attraction) {
    setName(attraction.name);
    setVisible(0);
    setShowResults(true);
  }

  //Create info card of single selected attraction
  function SelectedAttraction() {
    return <div>{tagList.map((attraction) => [SelectedCard(attraction)])}</div>;
  }

  //Close info card of single selected attraction
  function CloseAttraction() {
    return (
      <div>
        <button onClick={() => ResetList()}>Close</button>
      </div>
    );
  }

  //Card for each attraction
  function Card(attraction) {
    const { quick_location_updater } = useContext(QuickLocationContext);

    let lat = attraction.latitude;
    let lng = attraction.longitude;
    let LName = attraction.name.replace(/"/g, "");

    const GetDirections = () => {
      quick_location_updater({
        address_string: LName,
        latitude: lat,
        longitude: lng,
      });
    };

    return (
      <WholeCard>
        <CardImage src={attraction.img}></CardImage>
        <CardBody>
          <CardTitle>{attraction.name}</CardTitle>
          <CardLocation>{attraction.addressLocality}</CardLocation>
          <CardTags>{attraction.tags}</CardTags>
          <Buttons>
            <form action={attraction.url} method="get" target="_blank">
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                type="submit"
                startIcon={<FaExternalLinkAlt />}
              >
                Site
              </Button>
            </form>
            <Divider />
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              type="submit"
              onClick={() => ViewOnMap(attraction)}
              startIcon={<FaMapPin />}
            >
              Map
            </Button>
            <Divider />
            <Link to={"/"}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<FaRoute />}
                onClick={() => GetDirections()}
              >
                Route
              </Button>
            </Link>
          </Buttons>
        </CardBody>
      </WholeCard>
    );
  }

  return (
    <div>
      <div>{showResults && <SelectedAttraction />}</div>
      <div>{TouristMap(tagList)}</div>
      <div>{showResults && <CloseAttraction />}</div>
      <TagButtons>
        <TagButton onClick={() => handleClick("")}>All</TagButton>
        <TagButton onClick={() => handleClick("Art Gallery")}>
          Art Galleries
        </TagButton>
        <TagButton onClick={() => handleClick("Public Sculpture")}>
          Public Sculptures
        </TagButton>
        <TagButton onClick={() => handleClick("Historic Houses and Castle")}>
          Historic Houses and Castles
        </TagButton>
        <TagButton onClick={() => handleClick("Food and Drink")}>
          Food and Drink
        </TagButton>
        <TagButton onClick={() => handleClick("Music")}>Music</TagButton>
        <TagButton onClick={() => handleClick("Museums and Attraction")}>
          Museums and Attraction
        </TagButton>
        <TagButton onClick={() => handleClick("Gardens")}>Gardens</TagButton>
        <TagButton onClick={() => handleClick("Beach")}>Beaches</TagButton>
        <TagButton onClick={() => handleClick("Tour")}>Tours</TagButton>
        <TagButton onClick={() => handleClick("Walking")}>Walking</TagButton>
        <TagButton onClick={() => handleClick("Learning")}>Learning</TagButton>
      </TagButtons>
      <CardWrapper>
        {tagList.slice(0, visible).map((attraction) => [Card(attraction)])}
      </CardWrapper>
      <LoadButtonCont>
        {visible < tagList.length && (
          <LoadButton onClick={loadMore}>Load More</LoadButton>
        )}
      </LoadButtonCont>
    </div>
  );
}
