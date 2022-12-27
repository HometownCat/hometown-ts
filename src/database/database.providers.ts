import { DataSource } from 'typeorm';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // entities:
        //   process.env.NODEMON_START === 'TRUE'
        //     ? ['src/api/entities/**/*.entity{.js,.ts}']
        //     : ['dist/api/entities/**/*.entity{.js,.ts}'],
        // namingStrategy: new SnakeNamingStrategy(),
        logging: ['error'],
        timezone: '+09:00',
      });

      return dataSource.initialize();
    },
  },
];
