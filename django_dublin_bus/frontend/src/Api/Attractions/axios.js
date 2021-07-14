import axios from "axios";

const instance = axios.create({
    baseURL: "https://failteireland.azure-api.net/",
});

export default instance;