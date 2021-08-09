import React, { useState, useEffect, useContext } from "react";
import axios from "../../../Api/Events/axios";
import {
  RowContainer,
  PosterImg,
  PosterInfo,
  PosterText,
  PosterHead,
  RowHeading,
} from "./Row.elements";
import MoreInfo from "../MoreInfo/MoreInfo";
import SpotifyPreview from "../../Spotify/SpotifyPreview";
import SpotifyContext from "../../Spotify/SpotifyContext";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";
import {
  IsSpotifyAuthenticated,
  GetSpotifyAuthUrl,
} from "../../../Api/ApiFunctions";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
require('swiper/components/navigation/navigation.min.css');
require('swiper/components/pagination/pagination.min.css');
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import './SwiperStyle.css';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


function Row({ title, fetchUrl }) {
  const [events, setEvents] = useState([]);
  const [selEvent, setEvent] = useState("");

  const spotifydetails = useContext(SpotifyContext);

  let spotify_authenticated = spotifydetails.authenticated;
  let update_spotify_state = spotifydetails.update_spotify_state;
  let play_song = spotifydetails.play_song;

  const LoginSpotify = async () => {
    //retrieves the prepared authenticated url from the background
    let url = await GetSpotifyAuthUrl();

    //go to sotify's authentication page which upon completion will redirect back here causing the page to
    //re render and updating the authenticated state
    window.location.replace(url);
  };

  useEffect(async () => {
    async function fetchData() {
      //wait for answer to come back and then do something
      const request = await axios.get(fetchUrl);
      setEvents(request.data._embedded.events);
      return request;
    }

    let authenticated = await IsSpotifyAuthenticated();
    update_spotify_state({ authenticated: authenticated });

    fetchData();
    
  }, [fetchUrl]);

  const HandleClick = (event) => {
    if (selEvent) {
      setEvent("");
    } else {
      setEvent(event);
    }
  };

  return (
    <RowContainer>
      <RowHeading>
        {title}{" "}
        {spotify_authenticated & (title == "MUSIC") ? (
          <FontAwesomeIcon
            icon={faSpotify}
            size="1x"
            style={{ color: "#1DB954", marginRight: "8px" }}
          />
        ) : title == "MUSIC" ? (
          <Button
            variant="contained"
            style={{
              backgroundColor: "#1DB954",
              textTransform: "none",
            }}
            onClick={LoginSpotify}
          >
            {" "}
            <FontAwesomeIcon
              icon={faSpotify}
              size="1x"
              style={{ color: "white", marginRight: "8px" }}
            />
            <Typography style={{ color: "white", fontSize: "12px" }}>
              Connect Spotify for Artist Previews
            </Typography>
          </Button>
        ) : null}
      </RowHeading>


      <Swiper
         navigation
         pagination={{ "clickable": true }}
         breakpoints={{
          
          "360": {
            "slidesPerView": 3,
            "slidesPerGroup": 3,
            "spaceBetween": 5,
          },
          "900": {
            "slidesPerView": 3,
          },
          "1024": {
            "slidesPerView": 5,
            "slidesPerGroup": 5,
          },

          "1536": {
            "slidesPerView": 6,
            "slidesPerGroup": 6,
          },
          "1920": {
            "slidesPerView": 7,
            "slidesPerGroup": 7,
       }}}
       >
        {events.map((event) => [
          <SwiperSlide><PosterInfo key={event.id} onClick={() => HandleClick(event)}>
            <PosterImg
              key={event.id}
              src={event.images[0]["url"]}
              alt={event.name}
            ></PosterImg>
            {spotify_authenticated & (play_song != null) ? (
              title == "MUSIC" ? (
                <SpotifyPreview key={event.id} artist_name={event.name} />
              ) : null
            ) : null}
            <PosterHead>{event.name}</PosterHead>
            <PosterText>
              {event.dates.start.localTime}{"\n"}
              {new Date(event.dates.start.dateTime).toLocaleDateString('en-gb', {month: 'long',day: 'numeric'})}
            </PosterText>
          </PosterInfo></SwiperSlide>
        ])}
      </Swiper>
      {selEvent && MoreInfo(selEvent)}
    </RowContainer>
  );
}

export default Row;
