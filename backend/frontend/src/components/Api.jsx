import React from 'react';
import axios from 'axios';

export default function Api(){
    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api', // Thêm /api vào Base URL
        headers:{
            'content-type': 'application/json'
        },
        withCredentials: true, // Thêm để hỗ trợ credentials cho CORS
    });

    return{
        http
    }
}