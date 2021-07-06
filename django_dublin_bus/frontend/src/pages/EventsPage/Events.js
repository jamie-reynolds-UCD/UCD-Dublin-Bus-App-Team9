import React from "react";
import Row from "../../components/ExploreRows/Row";
import requests from "../../Api/Events/requests";

const Events = () => {
  return (
    <>
      {" "}
      <div>
        <Row title="Sports" fetchUrl={requests.fetchSport} />
        <Row title="Music" fetchUrl={requests.fetchMusic} />
        <Row title="Comedy" fetchUrl={requests.fetchComedy} />
      </div>
    </>
  );
};

export default Events;
