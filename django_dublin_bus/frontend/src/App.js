import React from "react";
import Home from "./Home";
import WrappedMap from "./Map";

const App = () => {
  return (
    <>
      <Home></Home>

      <div style={{width: '75vw', height: '100vh'}}>
        <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA`} 
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </>
  )
};

export default App;
