import axios from "axios";

const BASE_URL = "https://mystage.artelelectronics.com/api/v1";

const user = JSON.parse(localStorage.getItem("token"));

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${user?.token?.access}`,
  },
});
