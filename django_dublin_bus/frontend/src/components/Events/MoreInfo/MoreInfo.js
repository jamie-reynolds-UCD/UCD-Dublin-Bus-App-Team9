import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { InfoWindow, InfoContainer, TextWrapper, TopLine, TimeDate, Venue, MapContainer, Buttons } from "./MoreInfo.elements";
import { Link } from 'react-router-dom';


export default function MoreInfo(SelEvent) {

  const EventMap = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: parseFloat(SelEvent._embedded.venues[0].location.latitude), lng: parseFloat(SelEvent._embedded.venues[0].location.longitude) }}
    >
      <Marker
        position={{ lat: parseFloat(SelEvent._embedded.venues[0].location.latitude), lng: parseFloat(SelEvent._embedded.venues[0].location.longitude) }}
      />
    </GoogleMap>
  );

  const HandleClick = () => {
    console.log("Need to send",SelEvent._embedded.venues[0].location, "to destination input" )
}
  
  
    return (
      <InfoContainer>
        <InfoWindow>
          <TextWrapper>
            <TopLine>{SelEvent.name}</TopLine>
            <TimeDate>{SelEvent.dates.start.localTime}</TimeDate>
            <TimeDate>{SelEvent.dates.start.localDate}</TimeDate>
            <Venue>{SelEvent._embedded.venues[0].name}</Venue>
            <Venue>{SelEvent._embedded.venues[0].address.line1}</Venue>
          </TextWrapper>
          <Buttons>
            <form action={SelEvent.url} method="get" target="_blank">
              <button type="submit">Buy Tickets</button>
            </form>
            <Link to={'/'}>
              <button onClick={() => HandleClick()}> Plan Route </button>
            </Link>
          </Buttons>
        </InfoWindow>
        
        <MapContainer>
          <EventMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA`} 
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}/>
        </MapContainer>
      </InfoContainer>
    )
}
