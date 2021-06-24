import React from "react";
import WrappedMap from "../../components/Map/Map";
import OriginDestinInput from "../../components/RouteInput/OriginDestinInput";

const Home = () => {
  return (
    <>
      {" "}
      <div style={{ width: "50vw", height: "50vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,places,drawing&key=AIzaSyA3pi7A-nqYC6wrN-i_pupw3_UCv8lHqzA`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
        <OriginDestinInput />
      </div>
    </>
  );
};

export default Home;
