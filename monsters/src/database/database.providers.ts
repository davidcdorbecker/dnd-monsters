import * as mongoose from 'mongoose';
import {DATABASE_CONNECTION} from "../constants";

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(`mongodb://${!process.env.environment ? 'localhost' : 'mongo'}/monsters-db`),
    },
];