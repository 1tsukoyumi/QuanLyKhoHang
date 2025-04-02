import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-base-url.com/api', // thay bằng URL của API
  timeout: 10000,
});

export default api;
