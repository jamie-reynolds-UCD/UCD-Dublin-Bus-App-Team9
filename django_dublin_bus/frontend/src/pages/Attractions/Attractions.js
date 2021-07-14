import React from "react";
import requests from "../../Api/Attractions/requests";
import TouristMap from "../../components/Attractions/TouristMap/TouristMap";

const Attractions = () => {
  return (
    <>
      {" "}
      
      <div>
        <TouristMap fetchUrl={requests.fetchAttractions} />
      </div>
    </>
  );
};

export default Attractions;