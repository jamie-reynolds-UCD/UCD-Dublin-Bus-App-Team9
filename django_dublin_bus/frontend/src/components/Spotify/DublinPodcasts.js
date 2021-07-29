import React, { useEffect, useState } from "react";
import { GetPodcasts } from "../../Api/ApiFunctions";
import Podcast from "./Podcast";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Box } from "@material-ui/core";

const DublinPodcasts = () => {
  const [podcastDetails, setPodcastDetails] = useState({ podcasts: [] });

  useEffect(async () => {
    let response = await GetPodcasts();
    setPodcastDetails({ ...podcastDetails, podcasts: response.data.podcasts });
  }, []);

  return (
    <div>
      <Box
        borderRadius={8}
        style={{
          backgroundColor: "#1DB954",
          padding: "5px",
          maxWidth: "150px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography>
          <FontAwesomeIcon icon={faSpotify} /> Dublin Podcasts
        </Typography>
      </Box>
      {podcastDetails.podcasts
        ? podcastDetails.podcasts.map((podcast) => (
            <Podcast podcast={podcast} />
          ))
        : null}
    </div>
  );
};

export default DublinPodcasts;
