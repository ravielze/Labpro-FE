import axios from 'axios';

const Base = axios.create({
    baseURL: "http://localhost/v1",
})

export default Base;