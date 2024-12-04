import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api-psicologo-ia.vercel.app',
    headers: {
        'Content-type': 'application/json'
    }
})

export default axiosInstance