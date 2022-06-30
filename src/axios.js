import axios from "axios";
export const HTTP = axios.create({
    baseURL: `https://api.binance.com/api/v3`,
});