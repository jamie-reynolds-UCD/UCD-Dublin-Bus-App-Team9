import React, { useContext, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import SpotifyContext from "./SpotifyContext";
import CurrentSongContext from "./CurrentSongContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { PauseSong } from "../../Api/ApiFunctions";
import ProgressBar from "@ramonak/react-progress-bar";

const Track = ({ key, track, type, GoBack, GoForward }) => {
  const { play_song } = useContext(SpotifyContext);

  let current_song_details = useContext(CurrentSongContext);

  let is_playing =
    (track.id == current_song_details.current_song_id) &
    current_song_details.is_playing;

  let uri;

  if (type == "podcast") {
    uri = `spotify:episode:${track.id}`;
  }

  const playsong = () => {
    play_song(uri);
  };

  const pausesong = () => {
    PauseSong();
  };

  let progress = is_playing
    ? Math.floor(100 * (current_song_details.progress / track.duration_ms))
    : null;

  const GetEndTimestamp = (ms) => {
    let seconds = Math.floor(ms / 1000);

    let hour_string = "";

    let remaining_seconds = seconds;

    let hours = Math.floor(seconds / (60 * 60));

    if (hours > 0) {
      hour_string = `${hours < 10 ? "0" : ""}${hours}:`;
      remaining_seconds = remaining_seconds - hours * 60 * 60;
    }

    let remaining_minutes = Math.floor(remaining_seconds / 60);

    let minute_string = `${
      remaining_minutes < 10 ? "0" : ""
    }${remaining_minutes}:`;

    remaining_seconds = remaining_seconds - remaining_minutes * 60;

    let second_string = `${
      remaining_seconds < 10 ? "0" : ""
    }${remaining_seconds}`;

    return hour_string.concat(minute_string).concat(second_string);
  };

  let end_timestamp = GetEndTimestamp(track.duration_ms);

  const Progress_Bar = () => {
    if (is_playing) {
      return (
        <div style={{ width: "100%" }}>
          <ProgressBar
            completed={progress}
            bgColor="rgba(0, 0, 0, 0.6)"
            height="5px"
            isLabelVisible={false}
          />

          <div style={{ display: "flex", width: "100%", marginTop: "3px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                flex: 1,
              }}
            >
              <Typography
                style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "8px" }}
              >
                0:00
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              {" "}
              <Typography
                style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "8px" }}
              >
                {end_timestamp}
              </Typography>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <Button
            style={{ minHeight: "0px", minWidth: "0px", padding: "3px" }}
            onClick={() => {
              PauseSong();
              GoBack();
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faStepBackward}
              style={{ color: "rgba(0, 0, 0, 0.7)" }}
            />
          </Button>
        </div>
        <Button
          onClick={is_playing == false ? playsong : pausesong}
          style={{ minHeight: "0px", minWidth: "0px", padding: "3px" }}
        >
          {" "}
          <FontAwesomeIcon
            icon={is_playing ? faPause : faPlay}
            style={{ color: "rgba(0, 0, 0, 0.7)" }}
          />{" "}
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{ minHeight: "0px", minWidth: "0px", padding: "3px" }}
            onClick={() => {
              PauseSong();
              GoForward();
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faStepForward}
              style={{ color: "rgba(0, 0, 0, 0.7)" }}
            />
          </Button>
        </div>
      </div>
      <div
        style={
          is_playing
            ? { width: "100%", marginTop: "5px", marginBottom: "5px" }
            : { width: "100%" }
        }
      >
        {Progress_Bar()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Typography
          style={{
            fontSize: "10px",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {track.name}
        </Typography>
      </div>
    </>
  );
};

export default Track;
