import axios from "axios";

const GetRoute = async (params) => {
  //params is an object containing the users input latitude/longitude
  //retrieves the walking + bus directions from the backend
  let response;

  try {
    response = await axios.get("/api/getroute/", { params });
  } catch (error) {
    response = error.response;
  }

  return response;
};

const SignUpRequest = async (params) => {
  let response;

  try {
    response = await axios.post("/api/signup/", params);
  } catch (error) {
    response = error.response;
  }

  return response;
};

const LoginRequest = async (params) => {
  let response;

  try {
    response = await axios.post("/api/login/", params);
  } catch (error) {
    response = error.response;
  }

  return response;
};

const GetUserCredentials = async () => {
  let response;

  try {
    response = await axios.get("/api/usercredentials/");
  } catch (error) {
    response = error.response;
  }

  return response;
};

const Logout = async () => {
  let response;

  try {
    response = await axios.post("/api/logout/");
  } catch (error) {
    response = error.response;
  }

  return response;
};

const LoadUserLocations = async () => {
  let response;

  try {
    response = await axios.get("/api/userlocations/");
  } catch (error) {
    response = error.response;
  }

  return response;
};

const SaveNewLocation = async (params) => {
  let response;

  try {
    response = await axios.post("/api/savelocation/", params);
  } catch (error) {
    response = error.response;
  }

  return response;
};

const DeleteLocation = async (location_id) => {
  let response;

  try {
    response = await axios.post("/api/deletelocation/", { id: location_id });
  } catch (error) {
    response = error.response;
  }

  return response;
};

const IsSpotifyAuthenticated = async () => {
  let status;

  try {
    let response = await axios.get("/spotify/is-authenticated/");
    status = response.data.status;
  } catch (error) {
    status = false;
  }

  return status;
};

const GetSpotifyAuthUrl = async () => {
  let response = await axios.get("/spotify/get-auth-url/");

  let url = response.data.url;

  return url;
};

const GetCurrentSong = async () => {
  let response;
  try {
    response = await axios.get("/spotify/current-song/");
  } catch (error) {
    response = error.response;
  }

  return response;
};

const GetAccessToken = async () => {
  let response;
  try {
    response = await axios.get("/spotify/access-token/");
  } catch (error) {
    response = error.response;
  }
  return response;
};

const GetPodcastEpisodes = async (id) => {
  let response;

  try {
    response = await axios.get("/spotify/podcast-episodes/", {
      params: { id: id },
    });
  } catch (error) {
    response = error.response;
  }

  return response;
};

const GetPodcasts = async () => {
  let response;

  try {
    response = await axios.get("/spotify/get-podcasts/");
  } catch (error) {
    response = error.response;
  }

  return response;
};

const PauseSong = async () => {
  let response;
  try {
    response = await axios.get("/spotify/pause-song/");
  } catch (error) {
    response = error.response;
  }
};

const GetArtistDetails = async (artist_name) => {
  let response;
  try {
    response = await axios.get("/spotify/artist-details/", {
      params: { artist_name },
    });
  } catch (error) {
    response = error.response;
  }
  return response;
};

export {
  GetRoute,
  SignUpRequest,
  LoginRequest,
  GetUserCredentials,
  Logout,
  LoadUserLocations,
  SaveNewLocation,
  DeleteLocation,
  IsSpotifyAuthenticated,
  GetSpotifyAuthUrl,
  GetCurrentSong,
  GetAccessToken,
  GetPodcastEpisodes,
  GetPodcasts,
  PauseSong,
  GetArtistDetails,
};
