import React, { useContext } from "react";
import {
  SCardBody,
  SCardImage,
  SCardTitle,
  SCardLocation,
  SCardTags,
  SButtons,
} from "./SelectedCard.elements";
import { Link } from "react-router-dom";
import { AiOutlinePhone, AiOutlineLink } from "react-icons/ai";
import { RiRouteLine } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import QuickLocationContext from "../../SavedLocations/QuickLocationContext";

export default function SelectedCard(attraction) {
  const { quick_location_updater } = useContext(QuickLocationContext);

  let lat = attraction.latitude;
  let lng = attraction.longitude;
  let name = attraction.name;

  const GetDirections = () => {
    quick_location_updater({ address_string: name, lat, lng });
  };

  return (
    <SCardBody>
      <SCardImage src={attraction.img}></SCardImage>
      <SCardTitle>{attraction.name}</SCardTitle>
      <SCardLocation>{attraction.addressLocality}</SCardLocation>
      <SCardTags>{attraction.tags}</SCardTags>
      <SButtons>
        <form action={attraction.url} method="get" target="_blank">
          <button type="submit">
            <AiOutlineLink />
          </button>
        </form>
        <button onClick={() => callNumber(attraction.telephone)}>
          <AiOutlinePhone />
        </button>
        <Link to={"/"}>
          <button onClick={() => GetDirections}>
            <RiRouteLine /> Get There
          </button>
        </Link>
      </SButtons>
    </SCardBody>
  );
}
