import axios from 'axios';

const api = axios.create({
  baseURL: 'https://omnibox-api.herokuapp.com'
})

export default api;
