import React, { useState, useEffect } from 'react';
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";
import { MapContainer } from "../../Map/Map.elements";
import axios from "../../../Api/Attractions/axios";

function TouristMap({ fetchUrl }) {

  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
        
      async function fetchData() {
          const request = await axios.get(fetchUrl);
          setAttractions(request.data.results);
          return request;
      }
      fetchData();
    }, [fetchUrl]);


  const Map = withGoogleMap(props =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 53.3498, lng: -6.26031 }}
    >
      {attractions.map(attraction => [
          <Marker
            key={attraction.name}
            position={{ lat: attraction.geo.latitude, lng: attraction.geo.longitude }}
          />
            ])}
    </GoogleMap>
  );

  return (
    <MapContainer>
          <Map 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA`} 
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}/>
        </MapContainer>
  );
}

export default TouristMap;