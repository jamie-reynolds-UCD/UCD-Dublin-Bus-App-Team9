import React from "react";
import Row from "../../components/Events/EventsRows/Row";
import requests from "../../Api/Events/requests";
import Hero from "../../components/Events/Hero/Hero";
import Footer from "../../components/Footer/Footer";

const Events = () => {
  return (
    <>
      {" "}
      <div>
        {Hero("EVENTS.", "EXPLORE UPCOMING EVENTS IN DUBLIN...", "",  "https://i.imgur.com/s7llPTb.jpg", "30vh")}
        <Row title="MUSIC" fetchUrl={requests.fetchMusic} />
        <Row title="COMEDY" fetchUrl={requests.fetchComedy} />
        <Row title="ARTS & THEATRE" fetchUrl={requests.fetchArts} />
        <Row title="SPORTS" fetchUrl={requests.fetchSport} />
        <div style={{ height: '10vh' }} />
        {Hero("", "", "MUSIC SUBGENRES", "https://i.imgur.com/s7llPTb.jpg", "15vh")}
        <Row title="POP" fetchUrl={requests.fetchPop} />
        <Row title="DANCE / ELECTRONIC" fetchUrl={requests.fetchDance} />
        <Row title="ROCK" fetchUrl={requests.fetchRock} />
        <Row title="HIP-HOP / RAP" fetchUrl={requests.fetchRap} />
        <Row title="ALTERNATIVE ROCK" fetchUrl={requests.fetchAltRock} />
        <Row title="PUNK" fetchUrl={requests.fetchPunk} />
        <Row title="METAL" fetchUrl={requests.fetchMetal} />
        <Row title="FOLK" fetchUrl={requests.fetchFolk} />
        <Row title="OTHER" fetchUrl={requests.fetchOther} />
        <Footer />
      </div>
      
    </>
  );
};

export default Events;
