import axios from "axios";

export const backConnection = axios.create({
  baseURL: "http://localhost:4001/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
});
