import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  // Base URL API
  withCredentials: true,               
});

export default instance;
