import React, { useContext } from "react";
import MapContext from "./MapContext";
import { GoogleMap, withGoogleMap, Marker, Polyline } from "react-google-maps";
import { MapContainer } from "./Map.elements";

function Map() {
  const { markers, polylines } = useContext(MapContext);

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 53.3498, lng: -6.26031 }}>
      {markers.map((marker) => (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
      {polylines.map((polyline) => (
        <Polyline path={polyline}></Polyline>
      ))}
    </GoogleMap>
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
