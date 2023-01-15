import cron from 'node-cron'
import {Process} from '../jobs/process_pending_transactions'

cron.schedule('*/2 * * * * *', Process.run);