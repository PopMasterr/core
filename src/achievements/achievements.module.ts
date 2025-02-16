import { Module, Provider } from "@nestjs/common";
import { AchievementDiTokens } from "./di/achievement-tokens.di";
import { RulesEngine } from "./rules-engine/implementations/rules-engine";
import { AchievementRepositoryInterface } from "./repositories/achievement-repository.interface";
import { DataSource, Repository } from "typeorm";
import { Achievement } from "./entities/achievement.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { AchievementRepository } from "./repositories/mysql/achievement.repository";
import { InitializeAchievmentsService } from "./services/initialize-achievements.service";
import { rulesEngineInterface } from "./rules-engine/rules-engine.interface";
import { CheckViableAchievementsService } from "./services/check-viable-achievements.service";
import { FindAchievementsService } from "./services/find-achievements.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: AchievementDiTokens.MySQLAchievementsRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Achievement),
        inject: [DatabaseDiTokens.MySQLDataSource] 
    },
    {
        provide: AchievementDiTokens.AchievementsRepositoryInterface,
        useFactory: (repository: Repository<Achievement>) => new AchievementRepository(repository),
        inject: [AchievementDiTokens.MySQLAchievementsRepositoryInterface]
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: AchievementDiTokens.InitializeAchievementsService,
        useFactory: (
            rulesEngine: rulesEngineInterface
        ) => new InitializeAchievmentsService(rulesEngine),
        inject: [AchievementDiTokens.RulesEngineInterface]
    },
    {
        provide: AchievementDiTokens.CheckViableAchievementsService,
        useFactory: (
            rulesEngine: rulesEngineInterface
        ) => new CheckViableAchievementsService(rulesEngine),
        inject: [AchievementDiTokens.RulesEngineInterface]
    },
    {
        provide: AchievementDiTokens.FindAchievementsService,
        useFactory: (
            achievementsRepository: AchievementRepositoryInterface
        ) => new FindAchievementsService(achievementsRepository),
        inject: [AchievementDiTokens.AchievementsRepositoryInterface]
    }
]

const rulesEngineProviders: Array<Provider> = [
    {
        provide: AchievementDiTokens.RulesEngineInterface,
        useFactory: (
            achievementRepository: AchievementRepositoryInterface
        ) => new RulesEngine(achievementRepository),
        inject: [
            AchievementDiTokens.AchievementsRepositoryInterface
        ]
    }
]

@Module({
    providers: [...repositoryProviders, ...serviceProviders, ...rulesEngineProviders],
    exports: [AchievementDiTokens.CheckViableAchievementsService, AchievementDiTokens.FindAchievementsService]
})
export class AchievementsModule {}
