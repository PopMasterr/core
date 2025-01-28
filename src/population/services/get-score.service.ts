import { UpdateUserMetricsUseCase } from "src/users/services/usecases/update-user-metrics.usecase";
import { PopulationRepositoryInterface } from "../repositories/population-repository.interface";
import { PopulationResponse } from "../types/population.types";
import { GetScorePort, GetScoreUseCase } from "./usecases/get-score.usecase";

export class GetScoreService implements GetScoreUseCase {
    constructor(
        private readonly populationRepository: PopulationRepositoryInterface,
        private readonly updateUserMetricsService: UpdateUserMetricsUseCase
    ){}
    
    async execute(payload?: GetScorePort): Promise<PopulationResponse> {
        const scoreAndPopuolation = await this.populationRepository.getScore(payload.populationGuess, payload.population);

        return scoreAndPopuolation;
    }
}