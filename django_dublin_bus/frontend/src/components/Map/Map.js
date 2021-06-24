import React from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 53.3498, lng: -6.26031 }}
    />
  );
}

const WrappedMap = withGoogleMap(Map);

export default WrappedMap;
