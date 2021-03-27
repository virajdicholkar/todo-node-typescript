import path from 'path';
import { config as parseConfig } from 'dotenv';
const envPath = path.resolve('.env');
parseConfig({ path: envPath })
const config = {
    port: process.env.PORT,
    mongoDbUrl: process.env.MONGODBURL
};
console.log('config', config)
export default config;