import axios from "axios";

export default axios.create({
  baseURL: "https://v-put.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
