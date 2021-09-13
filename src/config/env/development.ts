import dotenv from 'dotenv';

dotenv.config();
const development = {
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    APP_PORT: process.env.PORT
};

export default development;
