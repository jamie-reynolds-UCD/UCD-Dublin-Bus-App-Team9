import React from "react";

const SpotifyContext = React.createContext({
  authenticated: false,
  player_ready: false,
  play_song: null,
  update_spotify_state: null,
});

export const SpotifyContextProvider = SpotifyContext.Provider;

export default SpotifyContext;
