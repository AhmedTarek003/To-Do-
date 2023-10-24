import axios from "axios";

const request = axios.create({
  baseURL: `https://to-do-xxgq.onrender.com/`,
});
export default request;
