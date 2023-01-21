import axios, {AxiosRequestConfig} from "axios";
import AuthService from "../services/auth.service";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config: AxiosRequestConfig) => {
    const user = AuthService.getCurrentUser()
    if (user === null) {
        return config
    }
    config.headers = {
        Authorization: `Bearer ${user.accessToken}`
    }
    return config;
});

jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log(error)
        if (error.response.status === 401) {
            console.log(' dispatching ')
            AuthService.logout()
        } else {
            return Promise.reject(error);
        }
    }
);
export default jwtInterceptor;