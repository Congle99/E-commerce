import React from 'react';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(config => {
  let token = localStorage.getItem('token');

  if (token) {
    token = token.replace(/^"(.*)"$/, '$1');
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default () => ({ http });

