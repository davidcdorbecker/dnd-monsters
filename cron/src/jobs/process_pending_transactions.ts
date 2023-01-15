import {KafkaProducer} from "../producer/producer";
import axios from "axios";

interface PendingTransaction {
    id: number,
    credits: number,
    egg_level: number,
    status: string,
    created_at: Date
}

interface ProcessTransactionMessage {
    transaction_id: number,
    monster_id: string
}

export module Process {
    export const run = async () => {
        console.log('Processing pending transactions job')

        try {
            const pendingTransactions = await getPendingTransactions()
            if (!pendingTransactions.length) {
                return
            }

            const body = pendingTransactions.map(({egg_level}) => egg_level)
            const monsters = (await getRandomMonsters(body)).map(({_id}) => _id)
            const messages = pendingTransactions.map(({id}, i) => ({
                transaction_id: id,
                monster_id: monsters[i]
            }))

            await processTransactions(messages)
            console.log(`${messages.length} transactions successfully processed`)
        } catch (e) {
            console.error(e)
        }
    }
}

const getPendingTransactions = async () => {
    const response = await axios({
        method: 'GET',
        url: `http://${process.env.USERS_API_HOST}:${process.env.USERS_API_PORT}/transactions/pending`
    })
    return response.data as unknown as PendingTransaction[]
}

const getRandomMonsters = async (data: number[]) => {
    const response = await axios({
        method: 'POST',
        url: `http://${process.env.MONSTERS_API_HOST}:${process.env.MONSTERS_API_PORT}/monsters/eggs`,
        data
    })
    return response.data as unknown as any[]
}

const processTransactions = async (messages: ProcessTransactionMessage[]) => {
    const kafka = KafkaProducer.getInstance();
    if (!kafka.isConnected) {
        await kafka.connect();
    }

    const producers = messages.map(message => kafka.producer.send({
        topic: 'finalize-transaction',
        messages: [
            {
                value: JSON.stringify(message),
            },
        ],
    }))
    await Promise.all(producers)
}