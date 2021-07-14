import React, { useContext, useRef, useEffect } from "react";
import MapContext from "./MapContext";
import { GoogleMap, withGoogleMap, Marker, Polyline } from "react-google-maps";
import { MapContainer } from "./Map.elements";
import { MAP } from "react-google-maps/lib/constants";

function Map() {
  const { markers, polylines, route_bounds, place_service_updater } =
    useContext(MapContext);
  const mapRef = useRef(null);

  useEffect(() => {
    let places_service = new google.maps.places.PlacesService(
      mapRef.current.context[MAP]
    );

    place_service_updater(places_service);
  }, []);

  useEffect(() => {
    //when the map mounts check if the route_bounds object has been set (i.e. a route has been selected)
    if (route_bounds == null) {
      return;
    }

    //if they have then create the bounds object, set the parameters and fit it to the map
    let bounds = new window.google.maps.LatLngBounds();
    bounds.extend(route_bounds[0]);
    bounds.extend(route_bounds[1]);
    mapRef.current.fitBounds(bounds);
  }, [route_bounds]);

  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={12}
      defaultCenter={{ lat: 53.3498, lng: -6.26031 }}
    >
      {markers.map((marker) => (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
      {polylines.map((polyline) => (
        <Polyline
          path={polyline.path}
          options={{
            strokeColor: polyline.travelmode == "WALKING" ? "blue" : "orange",
            strokeOpacity: 0.8,
            strokeWeight: 5,
          }}
        ></Polyline>
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
