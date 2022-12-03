import axios from "axios";

export default axios.create({
  baseURL: "https://web-production-1648.up.railway.app/api",
  //baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
