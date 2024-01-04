import axios from "axios";

const request = axios.create({
  baseURL: "https://wicked-gray-gorilla.cyclic.app",
});

export default request;
