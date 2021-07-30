import React, { useContext, useEffect } from "react";
import { GetAccessToken } from "../../Api/ApiFunctions";
import SpotifyContext from "./SpotifyContext";

const InitialiseWebPlayer = ({ authenticated, sdk_ready }) => {
  let { update_spotify_state } = useContext(SpotifyContext);
  useEffect(() => {
    console.log("INITIALISING WEB PLAYER");
    if (authenticated == false || sdk_ready == false) {
      //if user has not authenticated spotify already then don't try to initialise the player
      return null;
    }

    const player = new Spotify.Player({
      name: "Dublin Bus Player",
      getOAuthToken: async (cb) => {
        //get 0AuthToken is called whenever the player feels it needs a new access token
        //retrieve the access token stored in the backend and pass it to the callback
        let response = await GetAccessToken();
        cb(response.data.access_token);
      },
      volume: 1.0,
    });

    player.connect().then((success) => {
      if (success) {
        update_spotify_state({ failed_to_connect: false });
      } else {
        update_spotify_state({ failed_to_connect: true });
      }
    });

    player.addListener("ready", ({ device_id }) => {
      const iframe = document.querySelector(
        'iframe[src="https://sdk.scdn.co/embedded/index.html"]'
      );

      if (iframe) {
        iframe.style.display = "block";
        iframe.style.position = "absolute";
        iframe.style.top = "-1000px";
        iframe.style.left = "-1000px";
      }

      //create a function which can be accessed anywhere in the application which will
      //play a song once given its URI

      const play = ({
        spotify_uri,
        playerInstance: {
          _options: { getOAuthToken },
        },
      }) => {
        getOAuthToken((access_token) => {
          fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            {
              method: "PUT",
              body: JSON.stringify({ uris: [spotify_uri] }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
        });
      };

      let play_song_function = (spotify_uri) => {
        play({
          playerInstance: player,
          spotify_uri: spotify_uri,
          id: device_id,
        });
      };

      update_spotify_state({
        player_ready: true,
        play_song: play_song_function,
      });
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("playback_error", ({ message }) => {
      console.log("playback error");
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.log("authentication error");
      console.error(message);
    });
    player.addListener("account_error", ({ message }) => {
      console.log("account error");
      console.error(message);
    });

    // Playback status updates
    player.addListener("player_state_changed", (state) => {});

    // Ready

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
  }, [authenticated, sdk_ready]);

  return <></>;
};

export default InitialiseWebPlayer;
