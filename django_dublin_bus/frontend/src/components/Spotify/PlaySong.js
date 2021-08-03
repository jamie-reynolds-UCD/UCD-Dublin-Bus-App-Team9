import React, { useContext } from "react";
import SpotifyContext from "./SpotifyContext";
import { Button } from "@material-ui/core";

const PlaySong = ({ song_object }) => {
  const { play_song } = useContext(SpotifyContext);

  const PlayURI = () => {
    play_song("spotify:episode:580nXOW8nTtcnDNIbUJFyh");
  };

  return <Button onClick={PlayURI}>Play Song</Button>;
};

export default PlaySong;
