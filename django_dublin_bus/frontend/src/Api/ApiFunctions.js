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

export { GetRoute };
