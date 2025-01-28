import { PopulationRepositoryInterface } from "../repositories/population-repository.interface";
import { GameDataResponse } from "../types/population.types";
import { GetGameDataUseCase } from "./usecases/get-game-data.usecase";

export class GetGameDataService implements GetGameDataUseCase {
    constructor (
        private readonly populationRepository: PopulationRepositoryInterface
    ) { }
    
    async execute(payload?: null): Promise<GameDataResponse> {
        const gameData = await this.populationRepository.getGameData();

        return gameData;
    }
}
