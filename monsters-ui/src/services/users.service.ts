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
            const {data: userData} = await jwtInterceptor.get(USERS_API + '/users') as AxiosUserDataResponse
            console.log(userData)
            const monstersRequest = userData.monsters.map(({monster_id}) => axios({
                method: 'GET',
                url: `${MONSTERS_API}/byId/${monster_id}`
            }))
            userData.monsters = (await Promise.all(monstersRequest))
                .map(res => res.data)
                .reduce((acc, curr) => {
                    const {monsters, cache} = acc
                    if (cache[curr._id] !== undefined) {
                        monsters[cache[curr._id]].count++
                        return acc
                    }
                    monsters.push({...curr, count: 1})
                    cache[curr._id] = monsters.length - 1
                    return acc
                }, {monsters: [], cache: {}}).monsters as any[]
            userData.transactions = await this.getTransactions(userData.id)
            return userData
        } catch (e) {
            console.error(e)
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

    async doTransaction(eggLevel: number) {
        const {data} = await jwtInterceptor.post(USERS_API + '/transactions', {
            egg_level: eggLevel
        })
        return data as Transaction
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UsersService()