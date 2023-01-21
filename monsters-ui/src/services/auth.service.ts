import axios from 'axios'

const API_URL = `http://localhost:${process.env.REACT_APP_USERS_API_PORT}/auth/`;

class AuthService {
    async login(email: string, password: string) {
        const {data} = await axios({
            method: 'POST',
            url: API_URL + 'login',
            data: {email, password}
        })
        if (data.access_token) {
            localStorage.setItem('user', JSON.stringify({
                email,
                accessToken: data.access_token
            }))
        }
        return data
    }

    async signup(email: string, password: string, name: string) {
        const {data} = await axios({
            method: 'POST',
            url: API_URL + 'signup',
            data: {email, password, name}
        })
        if (data.access_token) {
            localStorage.setItem('user', JSON.stringify({
                email,
                accessToken: data.access_token
            }))
        }
        return data
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }

    logout() {
        localStorage.removeItem("user");
        window.location.href = '/login'
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService()

