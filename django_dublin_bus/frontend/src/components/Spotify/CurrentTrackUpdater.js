import React, { useEffect, useContext, useState } from "react";
import { GetAccessToken } from "../../Api/ApiFunctions";
import CurrentSongContext from "./CurrentSongContext";
import axios from "axios";

const CurrentTrackUpdater = ({ authenticated }) => {
  const { update_current_song_details } = useContext(CurrentSongContext);
  //variables to update include current_song_name, current_song_id, progress and is_playing

  var UpdateHandler;

  const GetCurrentSong = async (access_token) => {
    let endpoint =
      "https://api.spotify.com/v1/me/player/currently-playing?market=ES";

    let auth_header = `Bearer ${access_token}`;

    let response;
    try {
      response = await axios.get(endpoint, {
        headers: { Authorization: auth_header },
      });
    } catch (error) {
      response = error.response;
    }

    return response;
  };

  const GetCurrentEpisode = async (access_token) => {
    let endpoint =
      "https://api.spotify.com/v1/me/player/currently-playing?market=ES&type=episode";

    let auth_header = `Bearer ${access_token}`;

    let response;
    try {
      response = await axios.get(endpoint, {
        headers: { Authorization: auth_header },
      });
    } catch (error) {
      response = error.response;
    }

    return response;
  };

  const parse_song = (data) => {
    return {
      current_song_name: data.item.name,
      current_song_id: data.item.id,
      progress: data.progress_ms,
      is_playing: data.is_playing,
    };
  };

  const TryGetSong = async (access_token) => {
    let song_response;
    let track_details;

    song_response = await GetCurrentSong(access_token);

    if (song_response.status == 200) {
      try {
        track_details = parse_song(song_response.data);
      } catch (error) {
        //
      }
    }

    return {
      response_status: song_response.status,
      track_details: track_details,
    };
  };

  const TryGetPocast = async (access_token) => {
    let podcast_response;
    let track_details;

    podcast_response = await GetCurrentEpisode(access_token);

    if (podcast_response.status == 200) {
      try {
        track_details = parse_song(podcast_response.data);
      } catch (error) {
        //
      }
    }

    return {
      response_status: podcast_response.status,
      track_details: track_details,
    };
  };

  const GetSongDetails = async (access_token) => {
    let song_response = await TryGetSong(access_token);
    let track_details;

    if (song_response.track_details) {
      track_details = song_response.track_details;
    } else {
      let podcast_response = await TryGetPocast(access_token);
      if (podcast_response.track_details) {
        track_details = podcast_response.track_details;
      }
    }

    if (track_details) {
      //if track details were successfully retrieves then update the song details

      update_current_song_details(track_details);
    } else {
      //if we failed to get any details and if this was due to an invalid access token then refresh it now
      if (song_response.response_status == 401) {
        let access_token_response = await GetAccessToken();
        access_token = access_token_response.data.access_token;
      }
    }

    clearInterval(UpdateHandler);

    UpdateHandler = setInterval(() => GetSongDetails(access_token), 500);
  };

  useEffect(async () => {
    if (authenticated == false) {
      return null;
    }
    //when the component mounts, it means the user's spotify is authenticated so we can get their access token
    let response = await GetAccessToken();
    UpdateHandler = setInterval(
      () => GetSongDetails(response.data.access_token),
      500
    );
    return () => clearInterval(UpdateHandler);
  }, [authenticated]);

  return <></>;
};

export default CurrentTrackUpdater;
