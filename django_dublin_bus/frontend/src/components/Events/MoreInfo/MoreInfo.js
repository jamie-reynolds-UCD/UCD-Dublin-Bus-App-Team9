import React, { useContext } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { InfoWindow, InfoContainer, TextWrapper, TopLine, Time, EventDate, Venue, Address, MapContainer, Buttons, ButtonsContainer, Divider } from "./MoreInfo.elements";
import { Link } from 'react-router-dom';
import QuickLocationContext from "../../SavedLocations/QuickLocationContext";
import { Button } from '@material-ui/core';
import { FaRoute, FaTicketAlt } from 'react-icons/fa';

export default function MoreInfo(SelEvent) {

  const { quick_location_updater } = useContext(QuickLocationContext); 
  const venuelat = parseFloat(SelEvent._embedded.venues[0].location.latitude);
  const venuelong = parseFloat(SelEvent._embedded.venues[0].location.longitude);
  const venue = SelEvent._embedded.venues[0].name;

 
  const EventMap = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
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


    return (
      <InfoContainer>
        <InfoWindow>
          <TextWrapper>
            <TopLine>{SelEvent.name}</TopLine>
            <Venue>at {SelEvent._embedded.venues[0].name}</Venue>
            <Address>{SelEvent._embedded.venues[0].address.line1}</Address>
            <Time>{SelEvent.dates.start.localTime}</Time>
            <EventDate>{new Date(SelEvent.dates.start.dateTime).toLocaleDateString('en-gb', {month: 'long',day: 'numeric'})}</EventDate>
          </TextWrapper>
            <ButtonsContainer>
              <Buttons>
                <Link to={'/'}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<FaRoute />}
                    onClick={() => GetDirections()}
                  >
                    Route
                  </Button>
                </Link>
              </Buttons>
            <Divider />
              <Buttons>
                <form action={SelEvent.url} method="get" target="_blank">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    type="submit"
                    startIcon={<FaTicketAlt />}
                  >
                    Tickets
                  </Button> 
                </form>
              </Buttons>
            </ButtonsContainer>
        </InfoWindow>
        
        <MapContainer>
          <EventMap />
        </MapContainer>
      </InfoContainer>
    )
}