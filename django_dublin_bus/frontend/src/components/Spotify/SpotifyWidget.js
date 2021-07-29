import React, { useEffect, useState, useContext } from "react";
import {
  IsSpotifyAuthenticated,
  GetSpotifyAuthUrl,
} from "../../Api/ApiFunctions";
import { Button, Typography } from "@material-ui/core";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyContext from "./SpotifyContext";
import DublinPodcasts from "./DublinPodcasts";

const SpotifyWidget = () => {
  let [is_authenticated, setIsAuthenticated] = useState(false);
  let { update_spotify_state } = useContext(SpotifyContext);

  useEffect(async () => {
    let authenticated = await IsSpotifyAuthenticated();
    setIsAuthenticated(authenticated);
    update_spotify_state({ authenticated: authenticated });
  }, []);

  const LoginSpotify = async () => {
    //retrieves the prepared authenticated url from the background
    let url = await GetSpotifyAuthUrl();

    //go to sotify's authentication page which upon completion will redirect back here causing the page to
    //re render and updating the authenticated state
    window.location.replace(url);
  };

  const LoginButton = () => {
    return (
      <Button
        onClick={LoginSpotify}
        style={{
          textTransform: "none",
          backgroundColor: "#1DB954",
          color: "white",
        }}
      >
        Connect Spotify{" "}
        <FontAwesomeIcon icon={faSpotify} style={{ marginLeft: "5px" }} />
      </Button>
    );
  };

  return (
    <div>
      {is_authenticated ? (
        <div>
          <DublinPodcasts />
        </div>
      ) : (
        LoginButton()
      )}
    </div>
  );
};

export default SpotifyWidget;
