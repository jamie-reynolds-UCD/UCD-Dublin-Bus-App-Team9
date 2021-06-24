import React from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";
import { MapContainer } from './Map.elements';

function Map() {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 53.3498, lng: -6.26031 }}
    />
  );
}

const WrappedMap = withGoogleMap(Map);

const finalMap = () => {
  return (
    <MapContainer>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,places,drawing&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
    </MapContainer>
  );
};

export default finalMap;
