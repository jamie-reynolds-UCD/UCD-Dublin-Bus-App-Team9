import axios from "axios";

const instance = axios.create({
    baseURL: "https://app.ticketmaster.com",
});

export default instance;

