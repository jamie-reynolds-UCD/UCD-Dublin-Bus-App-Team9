import React, { useContext } from "react";
import MapContext from "./MapContext";
import { GoogleMap, withGoogleMap, Marker, Polyline } from "react-google-maps";

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

export default WrappedMap;
