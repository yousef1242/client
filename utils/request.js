import axios from "axios";

const request = axios.create({
  baseURL: "https://autoroomserver.onrender.com",
});

export default request;
