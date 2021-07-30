import axios from 'axios';

const Base = axios.create({
    baseURL: "https://api-labpro.ravielze.com/v1",
})

export default Base;