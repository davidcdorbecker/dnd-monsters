import {Transaction} from "./transaction";

export interface UserData {
    id: number,
    credits: number,
    monsters: any[],
    name: string,
    transactions: Transaction[]
}