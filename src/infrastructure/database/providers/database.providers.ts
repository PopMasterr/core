import { Provider } from "@nestjs/common";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { UserMetrics } from "src/users/entities/user-metrics.entity";

export const databaseProviders: Array<Provider>  = [
    {
        provide: DatabaseDiTokens.MySQLDataSource,
        useFactory: () => {
            const dataSource: DataSource = new DataSource({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
                entities: [User, UserMetrics],
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            });

            return dataSource.initialize();
        }
    }
]
