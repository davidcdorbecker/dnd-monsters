import {KafkaProducer} from "../producer/producer";

export module Process {
    export const run = async() => {
        console.log('Processing pending transactions job')



        // let kafka = KafkaProducer.getInstance();
        // if (!kafka.isConnected) {
        //     await kafka.connect();
        // }
        // await kafka.producer.send({
        //     topic: 'test-topic',
        //     messages: [
        //         {
        //             value: JSON.stringify({name: 'David'}),
        //         },
        //     ],
        // });
    }
}