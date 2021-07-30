import React, { useEffect, useState } from "react";
import { GetArtistDetails } from "../../Api/ApiFunctions";
import Track from "./Track";
import { SpotifyPreviewContainer } from "../Events/EventsRows/Row.elements";

const SpotifyPreview = ({ artist_name }) => {
  let [artistDetails, setArtistDetails] = useState({ songs: [] });

  const GetArtistDetails_ = async () => {
    let response = await GetArtistDetails(artist_name);

    setArtistDetails({ ...artistDetails, songs: response.data.songs });
  };
  useEffect(GetArtistDetails_, []);
  if (artistDetails.songs.length > 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <SpotifyPreviewContainer
          id={`spotify-container-${artistDetails.songs[0].id}`}
        >
          <Track
            track={artistDetails.songs[0]}
            GoBack={() => {}}
            GoForward={() => {}}
            type="track"
            preview={true}
          />
        </SpotifyPreviewContainer>
      </div>
    );
  } else {
    return null;
  }
};

export default SpotifyPreview;
