import { Module, Provider } from "@nestjs/common";
import { PopulationDITokens } from "./di/population-tokens.di";
import { PopulationRepository } from "./repositories/population-service/population.repository";
import { GetPopulationService } from "./services/get-population.service";
import { PopulationRepositoryInterface } from "./repositories/population-repository.interface";
import { PopulationController } from "./controllers/population.controller";
import { GetCoordinatesService } from "./services/get-coordinates.service";
import { CoordinatesController } from "./controllers/coordinates.controller";

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
            populationRepository: PopulationRepositoryInterface
        ) => new GetPopulationService(populationRepository),
        inject: [PopulationDITokens.PopulationRepositoryInterface]
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
    providers: [...repositoryProviders, ...serviceProviders]
})
export class PopulationModule {}
