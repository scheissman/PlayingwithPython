import axios from "axios";


export const HttpService = axios.create({

    baseURL: 'https://teretana1.runasp.net/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }


});