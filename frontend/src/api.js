import axios from 'axios'

const baseUrl = axios.create({ baseURL: "https://cryptic-ridge-02256.herokuapp.com/" })

export default baseUrl