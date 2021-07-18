import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Events from "./pages/EventsPage/Events";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Attractions from "./pages/Attractions/Attractions";
import { GetUserCredentials } from "./Api/ApiFunctions";
import { MapContextProvider } from "./components/Map/MapContext.js";
import { AuthContextProvider } from "./components/Auth/AuthContext.js";
import { QuickLocationContextProvider } from "./components/SavedLocations/QuickLocationContext.js";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import Profile from "./pages/Profile/Profile";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [mapDetails, setMapDetails] = useState({
    markers: [],
    polylines: [],
    route_object: [],
    route_bounds: null,
  });

  const [quickLocation, setQuickLocation] = useState({
    latitude: null,
    longitude: null,
    address_string: null,
  });

  const [placeService, setPlaceService] = useState(null);

  const UpdateQuickLocation = (new_loc) => {
    setQuickLocation({ ...quickLocation, ...new_loc });
  };

  const GetUsersLocation = () => {
    //function will resolve with an object containing the coordinates of the user else reject (caught in try catch)
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const GetUserCoordinatesAndString = async () => {
    //this function just returns an object: location which will contain
    //the latitude, longitude and string representation of users location (best efforts)
    let loc;
    let latitude;
    let longitude;

    try {
      loc = await GetUsersLocation();
      latitude = loc.coords.latitude;
      longitude = loc.coords.longitude;
    } catch (error) {}

    let auth_response = await GetUserCredentials();

    let auth_data = auth_response.status == 200 ? auth_response.data : {};

    setUserCredentials({
      ...userCredentials,
      current_location: { latitude: latitude, longitude: longitude },
      ...auth_data,
    });
  };

  const [userCredentials, setUserCredentials] = useState({
    loggedin: false,
    userid: null,
    username: null,
    current_location: { latitude: null, longitude: null },
  });

  const UpdateUserCredentials = async () => {
    let response = await GetUserCredentials();

    if (response.status == 200) {
      setUserCredentials({ ...userCredentials, ...response.data });
    }
  };

  useEffect(() => {
    UpdateUserCredentials();
    GetUserCoordinatesAndString();
  }, []);

  return (
    <Router>
      <QuickLocationContextProvider
        value={{
          latitude: quickLocation.latitude,
          longitude: quickLocation.longitude,
          address_string: quickLocation.address_string,
          quick_location_updater: UpdateQuickLocation,
        }}
      >
        <AuthContextProvider
          value={{
            loggedin: userCredentials.loggedin,
            userid: userCredentials.userid,
            username: userCredentials.username,
            current_location: userCredentials.current_location,
            updatecredentials: UpdateUserCredentials,
          }}
        >
          <MapContextProvider
            value={{
              markers: mapDetails.markers,
              polylines: mapDetails.polylines,
              route_bounds: mapDetails.route_bounds,
              setMapDetails: setMapDetails,
              place_service_updater: (new_service) =>
                setPlaceService(new_service),
            }}
          >
            <ScrollToTop />
            <GlobalStyle />
            <Navbar />
            <Switch>
              <Route path="/Events" exact render={() => <Events />} />
              <Route
                path="/"
                exact
                render={() => (
                  <Home
                    route_object={mapDetails.route_object}
                    quick_location={quickLocation}
                    current_location={userCredentials.current_location}
                    place_service={placeService}
                  ></Home>
                )}
              />
              <Route path="/signup" exact>
                <SignUp />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
                <Route path="/attractions" exact>
              <Attractions />
              </Route>
            </Switch>

            <Footer />
          </MapContextProvider>
        </AuthContextProvider>
      </QuickLocationContextProvider>
    </Router>
  );
}

export default App;
