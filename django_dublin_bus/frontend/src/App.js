import React, { useState } from "react";
import Home from "./Home";
import { MapContextProvider } from "./MapContext.js";

const App = () => {
  const [mapDetails, setMapDetails] = useState({
    markers: [],
    polylines: [],
    route_object: [],
  });

  //anything we put in the "value" section of the MapContextProvier we can access from any other component
  //for e.g. if the user clicks plan route elsewhere and this returns some markers that we want to show, then
  //we can call markerUpdater(markers) to update the markers and this gets passed all the way through the application
  return (
    <>
      <MapContextProvider
        value={{
          markers: mapDetails.markers,
          polylines: mapDetails.polylines,
          setMapDetails: setMapDetails,
        }}
      >
        <Home route_object={mapDetails.route_object}></Home>
      </MapContextProvider>
    </>
  );
};

export default App;
