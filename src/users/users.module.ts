import { Module, Provider } from "@nestjs/common";
import { UserDiTokens } from "./di/user-tokens.di";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { UserRepository } from "./repositories/mysql/user.repository";
import { UserRepositoryInterface } from "./repositories/user-repository.interface";
import { GetUserService } from "./services/get-user.service";
import { UsersController } from "./controller/users.controller";
import { UserMetrics } from "./entities/user-metrics.entity";
import { UserMetricsRepository } from "./repositories/mysql/user-metrics.repository";
import { UserMetricsRepositoryInterface } from "./repositories/user-metrics-repository.interface";
import { UpdateUserMetricsService } from "./services/update-user-metrics.service";
import { SaveUserService } from "./services/save-user.service";
import { GetUserByEmailService } from "./services/get-user-by-email.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: UserDiTokens.MySQLUserRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DatabaseDiTokens.MySQLDataSource],
    },
    {
        provide: UserDiTokens.UserRepositoryInterface,
        useFactory: (repository: Repository<User>) => new UserRepository(repository),
        inject: [UserDiTokens.MySQLUserRepositoryInterface]
    },
    {
        provide: UserDiTokens.MySQLUserMetricsRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserMetrics),
        inject: [DatabaseDiTokens.MySQLDataSource],
    },
    {
        provide: UserDiTokens.UserMetricsRepositoryInterface,
        useFactory: (repository: Repository<UserMetrics>) => new UserMetricsRepository(repository),
        inject: [UserDiTokens.MySQLUserMetricsRepositoryInterface]
    },
];

const serviceProviders: Array<Provider> = [
    {
        provide: UserDiTokens.GetUserService,
        useFactory: (repository: UserRepositoryInterface) => new GetUserService(repository),
        inject: [UserDiTokens.UserRepositoryInterface]
    },
    {
        provide: UserDiTokens.UpdateUserMetricsService,
        useFactory: (repository: UserMetricsRepositoryInterface) => new UpdateUserMetricsService(repository),
        inject: [UserDiTokens.UserMetricsRepositoryInterface]
    },
    {
        provide: UserDiTokens.GetUserByEmailService,
        useFactory: (repository: UserRepositoryInterface) => new GetUserByEmailService(repository),
        inject: [UserDiTokens.UserRepositoryInterface]
    },
    {
        provide: UserDiTokens.SaveUserService,
        useFactory: (repository: UserRepositoryInterface) => new SaveUserService(repository),
        inject: [UserDiTokens.UserRepositoryInterface]
    }
];

@Module({
    controllers: [UsersController],
    providers: [...repositoryProviders, ...serviceProviders],
    exports: [UserDiTokens.UpdateUserMetricsService, UserDiTokens.SaveUserService, UserDiTokens.UserRepositoryInterface, UserDiTokens.GetUserByEmailService]
})
export class UsersModule {}
