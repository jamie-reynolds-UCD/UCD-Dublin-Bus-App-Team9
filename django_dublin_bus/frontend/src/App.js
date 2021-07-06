import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Events from "./pages/EventsPage/Events";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { GetUserCredentials } from "./Api/ApiFunctions";
import { MapContextProvider } from "./components/Map/MapContext.js";
import { AuthContextProvider } from "./components/Auth/AuthContext.js";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Weather } from "./components";

function App() {
  const [mapDetails, setMapDetails] = useState({
    markers: [],
    polylines: [],
    route_object: [],
    route_bounds: null,
  });

  const [userCredentials, setUserCredentials] = useState({
    loggedin: false,
    userid: null,
  });

  const UpdateUserCredentials = async () => {
    let response = await GetUserCredentials();
    if (response.status == 200) {
      setUserCredentials({ ...userCredentials, ...response.data });
    }
  };

  useEffect(UpdateUserCredentials, []);

  return (
    <Router>
      <AuthContextProvider
        value={{
          loggedin: userCredentials.loggedin,
          userid: userCredentials.userid,
          updatecredentials: UpdateUserCredentials,
        }}
      >
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
              render={() => (
                <Home route_object={mapDetails.route_object}></Home>
              )}
            />
            <Route
            path="/Events"
            exact
            render={() => <Events></Events>}
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
      </AuthContextProvider>
    </Router>
  );
}

export default App;
