import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { GetPodcastEpisodes } from "../../Api/ApiFunctions";
import Track from "./Track";

const Podcast = ({ podcast }) => {
  let [episodeDetails, setEpisodeDetails] = useState({
    episodes: [],
    episode_chosen: 0,
  });

  const GetEpisodes = async () => {
    let response = await GetPodcastEpisodes(podcast.id);
    setEpisodeDetails({ ...episodeDetails, episodes: response.data.episodes });
  };

  useEffect(GetEpisodes, []);

  const GoBack = () => {
    if (episodeDetails.episode_chosen == 0) {
      setEpisodeDetails({
        ...episodeDetails,
        episode_chosen: episodeDetails.episodes.length - 1,
      });
    } else {
      setEpisodeDetails({
        ...episodeDetails,
        episode_chosen: episodeDetails.episode_chosen - 1,
      });
    }
  };

  const GoForward = () => {
    if (episodeDetails.episode_chosen == episodeDetails.episodes.length - 1) {
      setEpisodeDetails({ ...episodeDetails, episode_chosen: 0 });
    } else {
      setEpisodeDetails({
        ...episodeDetails,
        episode_chosen: episodeDetails.episode_chosen + 1,
      });
    }
  };
  return (
    <Box
      boxShadow={1}
      borderRadius={8}
      style={{ padding: "7px", width: "200px" }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img
          height="30"
          width="auto"
          src={podcast.image}
          style={{ borderRadius: "50%", marginLeft: "5px", marginRight: "5px" }}
        />
        <Typography variant="caption" style={{ fontWeight: "bold" }}>
          {podcast.name}
        </Typography>
      </div>
      {episodeDetails.episodes.length == 0 ? null : (
        <Track
          key={episodeDetails.episodes[episodeDetails.episode_chosen].id}
          track={episodeDetails.episodes[episodeDetails.episode_chosen]}
          type={"podcast"}
          GoBack={GoBack}
          GoForward={GoForward}
        />
      )}
    </Box>
  );
};

export default Podcast;
