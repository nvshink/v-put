import axios from "axios";

export default axios.create({
  baseURL: "https://git.heroku.com/v-put.git",
  headers: {
    "Content-type": "application/json"
  }
});
