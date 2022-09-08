import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    // baseURL: "https://api.linguoo.com/arg/",
    // baseURL: "http://localhost:5004/arg/",
})

export const instanceLinguoo = axios.create({
    // baseURL: "https://api.themoviedb.org/3",
    baseURL: "https://api.linguoo.com/arg/",
    // baseURL: "http://localhost:5004/arg/",
})

export default instance
