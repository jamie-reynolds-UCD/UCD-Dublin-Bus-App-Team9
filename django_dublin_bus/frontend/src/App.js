import React, { useState } from "react";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { MapContextProvider } from "./components/Map/MapContext.js";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import {Weather} from "./components";


function App() {
  const [mapDetails, setMapDetails] = useState({
    markers: [],
    polylines: [],
    route_object: [],
    route_bounds: null,
  });

  return (
    
    <Router>
      <MapContextProvider
        value={{
          markers: mapDetails.markers,
          polylines: mapDetails.polylines,
          route_bounds: mapDetails.route_bounds,
          setMapDetails: setMapDetails,
        }}
      >
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home route_object={mapDetails.route_object}></Home>}
          />
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
        <Weather />
        <Footer />
      </MapContextProvider>

    </Router>
    
  );
}

export default App;
