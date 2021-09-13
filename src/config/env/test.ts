import dotenv from 'dotenv';

dotenv.config();
const test = {
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_TEST_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_TEST_DB,
    APP_PORT: process.env.TEST_PORT
};

export default test;
