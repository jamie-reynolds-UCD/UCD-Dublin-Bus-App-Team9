import React from "react";
import WrappedMap from "./Map";
import OriginDestinInput from "./OriginDestinInput";

const Home = () => {
  return (
    <>
      {" "}
      <div style={{ width: "75vw", height: "100vh" }}>
        <OriginDestinInput />
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,places,drawing&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </>
  );
};

export default Home;
