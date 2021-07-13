import React from "react";
import Row from "../../components/Events/EventsRows/Row";
import requests from "../../Api/Events/requests";

const Events = () => {
  return (
    <>
      {" "}
      <div>
        <Row title="Music" fetchUrl={requests.fetchMusic} />
        <Row title="Sports" fetchUrl={requests.fetchSport} />
        <Row title="Comedy" fetchUrl={requests.fetchComedy} />
        <Row title="Pop" fetchUrl={requests.fetchPop} />
        <Row title="Alternative Rock" fetchUrl={requests.fetchAlt} />
        <Row title="Indie Folk" fetchUrl={requests.fetchIndieFolk} />
        <Row title="Other" fetchUrl={requests.fetchOther} />
      </div>
    </>
  );
};

export default Events;
