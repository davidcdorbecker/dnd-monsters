import {Kafka, Producer} from 'kafkajs';

export class KafkaProducer {
    private static instance: KafkaProducer;
    private _producer: Producer
    private _isConnected: Boolean = false;

    private constructor() {
        const kafka = new Kafka({
            clientId: 'cron',
            brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
        });
        this._producer = kafka.producer();
    }

    public static getInstance(): KafkaProducer {
        if (!KafkaProducer.instance) {
            KafkaProducer.instance = new KafkaProducer();
        }
        return KafkaProducer.instance;
    }

    public get isConnected() {
        return this._isConnected;
    }

    async connect(): Promise<void> {
        try {
            await this._producer.connect();
            this._isConnected = true;
        } catch (err) {
            console.error(err);
        }
    }

    get producer() {
        return this._producer;
    }
}