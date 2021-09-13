import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from 'config'

const configSeed: ConnectionOptions = {
  type: 'postgres',
  host: config.PG_HOST,
  port: Number(config.PG_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/database/seeds/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/seeds',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = configSeed;
