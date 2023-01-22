import cron from 'node-cron'
import {Process} from '../jobs/process_pending_transactions'

cron.schedule('*/30 * * * * *', Process.runPendingTransactions);
cron.schedule('0 0 */1 * * *', Process.runInjectCredits);