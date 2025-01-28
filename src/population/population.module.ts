import { Module, Provider } from "@nestjs/common";
import { PopulationDITokens } from "./di/population-tokens.di";
import { PopulationRepository } from "./repositories/population-service/population.repository";
import { PopulationRepositoryInterface } from "./repositories/population-repository.interface";
import { UsersModule } from "src/users/users.module";
import { UpdateUserMetricsUseCase } from "src/users/services/usecases/update-user-metrics.usecase";
import { UserDiTokens } from "src/users/di/user-tokens.di";
import { GetGameDataService } from "./services/get-game-data.service";
import { GetScoreService } from "./services/get-score.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: PopulationDITokens.PopulationRepositoryInterface,
        useFactory: () => new PopulationRepository(),
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: PopulationDITokens.GetScoreService,
        useFactory: (
            populationRepository: PopulationRepositoryInterface,
            updateUserMetricsService: UpdateUserMetricsUseCase
        ) => new GetScoreService(populationRepository, updateUserMetricsService),
        inject: [
            PopulationDITokens.PopulationRepositoryInterface,
            UserDiTokens.UpdateUserMetricsService,
        ]
    },
    {
        provide: PopulationDITokens.GetGameDataService,
        useFactory: (
            populationRepository: PopulationRepositoryInterface
        ) => new GetGameDataService(populationRepository),
        inject: [ PopulationDITokens.PopulationRepositoryInterface ]
    }
]

@Module({
    providers: [...repositoryProviders, ...serviceProviders],
    imports: [UsersModule],
    exports: [PopulationDITokens.GetScoreService, PopulationDITokens.GetGameDataService]
})
export class PopulationModule {}
