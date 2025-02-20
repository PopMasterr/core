import { UpdateUserMetricsUseCase } from "src/users/services/usecases/update-user-metrics.usecase";
import { PopulationRepositoryInterface } from "../repositories/population-repository.interface";
import { PopulationResponse } from "../types/population.types";
import { GetScorePort, GetScoreUseCase } from "./usecases/get-score.usecase";
import { AddUserAchievementsUseCase } from "src/users/services/usecases/add-user-achievements.usecase";

export class GetScoreService implements GetScoreUseCase {
    constructor(
        private readonly populationRepository: PopulationRepositoryInterface,
        private readonly updateUserMetricsService: UpdateUserMetricsUseCase,
        private readonly addUserAchievementsService: AddUserAchievementsUseCase
    ) { }

    async execute(payload?: GetScorePort): Promise<PopulationResponse> {
        const { populationGuess, population, userId } = payload;
        let scoreAndPopuolation: PopulationResponse = await this.populationRepository.getScore(populationGuess, population);
        scoreAndPopuolation.population = population;
        
        await this.updateUserMetricsService.execute({ userId: userId, score: scoreAndPopuolation.score });
        await this.addUserAchievementsService.execute({ userId: userId, score: scoreAndPopuolation.score })

        return scoreAndPopuolation;
    }
}
