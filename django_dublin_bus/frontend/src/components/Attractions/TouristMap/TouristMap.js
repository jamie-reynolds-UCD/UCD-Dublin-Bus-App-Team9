import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { MapContainer } from "./TouristMap.elements";
import MarkerWithInfoWindow from "./Marker";

export default function TouristMap(AttractionList) {

  const Map = compose(
    
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=...&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA",
      loadingElement: <div style={{height: `100%`}}/>,
      containerElement: <div style={{height: `400px`}}/>,
      mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: AttractionList[0].latitude, lng: AttractionList[0].longitude }}
    >
      {AttractionList.map(attraction => [
        <MarkerWithInfoWindow key={attraction.name}
        position={{ lat: attraction.latitude, lng: attraction.longitude }} content={attraction.name} />
            ])}
    </GoogleMap>
  );

  return (
    <MapContainer>
        <Map />
    </MapContainer>
  );
};
