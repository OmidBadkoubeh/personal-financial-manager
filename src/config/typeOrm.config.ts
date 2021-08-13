import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { DbConfig } from '@src/types';

const dbConfig = config.get<DbConfig>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: (process.env.TYPEORM_TYPE as DbConfig['type']) || dbConfig.type,
  host: process.env.TYPEORM_HOST || dbConfig.host,
  port: parseInt(process.env.TYPEORM_PORT) || dbConfig.port,
  username: process.env.TYPEORM_USERNAME || dbConfig.username,
  password: process.env.TYPEORM_PASSWORD || dbConfig.password,
  database: process.env.TYPEORM_DATABASE || dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: !!process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
