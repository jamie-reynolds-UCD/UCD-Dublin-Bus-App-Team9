import React from "react";
import FinalMap from "../../components/Map/Map";
import OriginDestinInput from "../../components/RouteInput/OriginDestinInput";
import RouteDescription from "../../components/RouteDescription/RouteDescription";

const Home = ({ route_object }) => {
  return (
    <>
      {" "}
      <div style={{ width: "75vw", height: "100vh" }}>
        <OriginDestinInput />
        <RouteDescription route_object={route_object} />
        <FinalMap />
      </div>
    </>
  );
};

export default Home;
