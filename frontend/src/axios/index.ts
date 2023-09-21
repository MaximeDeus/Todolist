import axios from 'axios';
const config = {
    baseURL: 'http://localhost:8080'
}
const customAxios = axios.create(config);

export default customAxios;