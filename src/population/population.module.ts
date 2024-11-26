import { Module, Provider } from "@nestjs/common";
import { PopulationDITokens } from "./di/population-tokens.di";
import { PopulationRepository } from "./repositories/population-service/population.repository";
import { GetPopulationService } from "./services/get-population.service";
import { PopulationRepositoryInterface } from "./repositories/population-repository.interface";
import { PopulationController } from "./controllers/population.controller";
import { GetCoordinatesService } from "./services/get-coordinates.service";
import { CoordinatesController } from "./controllers/coordinates.controller";
import { UsersModule } from "src/users/users.module";
import { UpdateUserMetricsUseCase } from "src/users/services/usecases/update-user-metrics.usecase";
import { UserDiTokens } from "src/users/di/user-tokens.di";

const repositoryProviders: Array<Provider> = [
    {
        provide: PopulationDITokens.PopulationRepositoryInterface,
        useFactory: () => new PopulationRepository(),
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: PopulationDITokens.GetPopulationUseCase,
        useFactory: (
            populationRepository: PopulationRepositoryInterface,
            updateUserMetricsService: UpdateUserMetricsUseCase
        ) => new GetPopulationService(populationRepository, updateUserMetricsService),
        inject: [
            PopulationDITokens.PopulationRepositoryInterface,
            UserDiTokens.UpdateUserMetricsService,
        ]
    },
    {
        provide: PopulationDITokens.GetCoordinatesUseCase,
        useFactory: (
            populationRepository: PopulationRepositoryInterface
        ) => new GetCoordinatesService(populationRepository),
        inject: [PopulationDITokens.PopulationRepositoryInterface]
    }
]

@Module({
    controllers: [PopulationController, CoordinatesController],
    providers: [...repositoryProviders, ...serviceProviders],
    imports: [UsersModule]
})
export class PopulationModule {}
