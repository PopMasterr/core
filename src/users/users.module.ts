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
import { UpdateUserMetricsHighestStreakService } from "./services/update-user-metrics-highest-streak.service";
import { UserAchievement } from "./entities/user-achievements.entity";
import { UserAchievementsRepository } from "./repositories/mysql/user-achievements.repository";
import { AddUserAchievementsService } from "./services/add-user-achievements.service";
import { UserAchievementsRepositoryInterface } from "./repositories/user-achievements-repository.interface";
import { CheckViableAchievementsUseCase } from "src/achievements/services/usecases/check-viable-achievements.usecase";
import { AchievementsModule } from "src/achievements/achievements.module";
import { AchievementDiTokens } from "src/achievements/di/achievement-tokens.di";
import { FindUserAchievementsService } from "./services/find-user-achievements.service";
import { FindAchievementsUseCase } from "src/achievements/services/usecases/find-achievements.usecase";
import { UserAchievmentsController } from "./controller/user-achievements.controller";

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
    {
        provide: UserDiTokens.MySQLUserAchievementsRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserAchievement),
        inject: [DatabaseDiTokens.MySQLDataSource],
    },
    {
        provide: UserDiTokens.UserAchievementsRepositoryInterface,
        useFactory: (repository: Repository<UserAchievement>) => new UserAchievementsRepository(repository),
        inject: [UserDiTokens.MySQLUserAchievementsRepositoryInterface]
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
        useFactory: (
            repository: UserRepositoryInterface,
            userMetricsRepository: UserMetricsRepositoryInterface
        ) => new SaveUserService(repository, userMetricsRepository),
        inject: [
            UserDiTokens.UserRepositoryInterface,
            UserDiTokens.UserMetricsRepositoryInterface
        ]
    },
    {
        provide: UserDiTokens.UpdateUserMetricsHighestStreakService,
        useFactory: (
            UserMetricsRepository: UserMetricsRepositoryInterface
        ) => new UpdateUserMetricsHighestStreakService(UserMetricsRepository),
        inject: [
            UserDiTokens.UserMetricsRepositoryInterface
        ]
    },
    {
        provide: UserDiTokens.AddUserAchievementService,
        useFactory: (
            userAchievementRepository: UserAchievementsRepositoryInterface,
            checkViableAchievementsService: CheckViableAchievementsUseCase,
            userMetricsRepository: UserMetricsRepositoryInterface
        ) => new AddUserAchievementsService(userAchievementRepository, checkViableAchievementsService, userMetricsRepository),
        inject: [
            UserDiTokens.UserAchievementsRepositoryInterface,
            AchievementDiTokens.CheckViableAchievementsService,
            UserDiTokens.UserMetricsRepositoryInterface
        ]
    },
    {
        provide: UserDiTokens.FindUserAchievementsService,
        useFactory: (
            userAchievementsRepository: UserAchievementsRepositoryInterface,
            findAchievementsService: FindAchievementsUseCase
        ) => new FindUserAchievementsService(userAchievementsRepository, findAchievementsService),
        inject: [
            UserDiTokens.UserAchievementsRepositoryInterface,
            AchievementDiTokens.FindAchievementsService
        ]
    }
];

@Module({
    controllers: [UsersController, UserAchievmentsController],
    providers: [...repositoryProviders, ...serviceProviders],
    exports: [
        UserDiTokens.UpdateUserMetricsService,
        UserDiTokens.SaveUserService, 
        UserDiTokens.UserRepositoryInterface, 
        UserDiTokens.GetUserByEmailService, 
        UserDiTokens.UpdateUserMetricsHighestStreakService,
        UserDiTokens.AddUserAchievementService,
        UserDiTokens.GetUserService
    ],
    imports: [AchievementsModule]
})
export class UsersModule {}
