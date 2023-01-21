import jwtInterceptor from "../common/interceptor";
import axios from "axios";
import {UserData} from "../models/user_data";
import {Transaction} from "../models/transaction";

const USERS_API = `http://localhost:${process.env.REACT_APP_USERS_API_PORT}`
const MONSTERS_API = `http://localhost:${process.env.REACT_APP_MONSTERS_API_PORT}/monsters`

interface AxiosUserDataResponse {
    data: UserData
}

class UsersService {
    async getUserData() {
        try {
            const {data: userData} = await jwtInterceptor.get(USERS_API+'/users') as AxiosUserDataResponse
            console.log(userData)
            const monstersRequest = userData.monsters.map(({monster_id}) => axios({
                method: 'GET',
                url: `${MONSTERS_API}/byId/${monster_id}`
            }))
            userData.monsters = (await Promise.all(monstersRequest)).map(res => res.data) as any[]
            return userData
        } catch (e) {
            console.log(e)
        }
    }

    async getEggs() {
        const eggsRequest = await axios({
            method: 'GET',
            url: MONSTERS_API + '/eggs'
        })
        return eggsRequest.data
    }

    async getTransactions(userId: number) {
        const {data} = await jwtInterceptor.get(`${USERS_API}/transactions/byUserId/${userId}`)
        return data as Transaction[]
    }

    doTransaction(eggLevel: number) {
        return jwtInterceptor.post(USERS_API + '/transactions',  {
            egg_level: eggLevel
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UsersService()