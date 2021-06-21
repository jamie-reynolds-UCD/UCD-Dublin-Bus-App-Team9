import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
    return <GoogleMap 
        defaultZoom={12} 
        defaultCenter={{lat: 53.3498, lng: -6.260310 }} 
    />;
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;