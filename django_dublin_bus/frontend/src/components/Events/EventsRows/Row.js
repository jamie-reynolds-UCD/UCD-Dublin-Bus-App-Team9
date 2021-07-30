import React, { useState, useEffect, useContext } from "react";
import axios from "../../../Api/Events/axios";
import {
  RowContainer,
  PosterImg,
  PosterInfo,
  PosterText,
  PosterHead,
  RowPosters,
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

  // Snippet of code that runs based on a specific condition/variable
  // Function pulls information from Ticketmaster when the row function is called
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
    // if [], run once when the row loads and don't run again
    //Have to include variable below because useEffect depends on the variable
    //Using a var which is passed from outside the block, need to tell useEffect this
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
        {spotify_authenticated & (title == "Music") ? (
          <FontAwesomeIcon
            icon={faSpotify}
            size="1x"
            style={{ color: "#1DB954", marginRight: "8px" }}
          />
        ) : title == "Music" ? (
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
      <RowPosters>
        {events.map((event) => [
          <PosterInfo key={event.id} onClick={() => HandleClick(event)}>
            <PosterImg
              key={event.id}
              src={event.images[0]["url"]}
              alt={event.name}
            ></PosterImg>
            {spotify_authenticated & (play_song != null) ? (
              title == "Music" ? (
                <SpotifyPreview key={event.id} artist_name={event.name} />
              ) : null
            ) : null}
            <PosterHead>{event.name}</PosterHead>
            <PosterText>
              {event.dates.start.localTime}
              {"\n"}
              {event.dates.start.localDate}
            </PosterText>
          </PosterInfo>,
        ])}
      </RowPosters>
      {/*If an event is selcted, show the information window  */}
      {selEvent && MoreInfo(selEvent)}
    </RowContainer>
  );
}

export default Row;
