import React, { useContext } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { InfoWindow, InfoContainer, TextWrapper, TopLine, TimeDate, Venue, MapContainer, Buttons } from "./MoreInfo.elements";
import { Link } from 'react-router-dom';
import QuickLocationContext from "../../SavedLocations/QuickLocationContext";


export default function MoreInfo(SelEvent) {

  const { quick_location_updater } = useContext(QuickLocationContext); 
  const venuelat = parseFloat(SelEvent._embedded.venues[0].location.latitude);
  const venuelong = parseFloat(SelEvent._embedded.venues[0].location.longitude);
  const venue = SelEvent._embedded.venues[0].name;

  
  //Google Map marker of selected event
  const EventMap = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: venuelat, lng: venuelong }}
    >
      <Marker
        position={{ lat: venuelat, lng: venuelong }}
      />
    </GoogleMap>
  );

  //OnClick of 'PlanRoute' bring user backt to the homepage with the selected venue entered as destination
  const GetDirections = () => {
    quick_location_updater({address_string: venue, latitude: venuelat, longitude: venuelong}) 
  }

  console.log(venue, venuelat, venuelong);


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
              <button onClick={() => GetDirections}> Plan Route </button>
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
