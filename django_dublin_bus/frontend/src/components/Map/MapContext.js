import React from "react";

const MapContext = React.createContext({ markers: [] });

export const MapContextProvider = MapContext.Provider;

export default MapContext;
