import axios from 'axios';

// let base = "api"

let base = "http://127.0.0.1:53010/"; //测试


export const post = (url, query) => {
	return axios.post(base+url,query)
};

export const get = (url, query) => {
	return axios.get(base+url,query)
};

export const url = base;

