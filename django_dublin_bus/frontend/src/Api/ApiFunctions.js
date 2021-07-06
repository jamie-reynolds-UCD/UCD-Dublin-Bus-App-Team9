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

export { GetRoute, SignUpRequest, LoginRequest, GetUserCredentials, Logout };
