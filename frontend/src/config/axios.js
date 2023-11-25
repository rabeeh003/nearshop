import axios from "axios";

export const normalClint = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

const client = axios.create({ baseURL: "http://localhost:3000/api/" })

export const request = ({ ...options }) => {
    if (localStorage.getItem('artistKey')) {
        client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('artistKey')}`
    } else {
        delete client.defaults.headers.common.Authorization;
    }

    const onSuccess = (response) => response;
    const onError = (error) => {
        return error;
    }

    return client(options).then(onSuccess).catch(onError);
}