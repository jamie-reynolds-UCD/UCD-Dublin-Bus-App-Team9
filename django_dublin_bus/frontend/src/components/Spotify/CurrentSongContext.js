import React from "react";

const CurrentSongContext = React.createContext({
  current_song_name: null,
  current_song_id: null,
  progress: null,
  is_playing: null,
});

export const CurrentSongContextProvider = CurrentSongContext.Provider;

export default CurrentSongContext;
