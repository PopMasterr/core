import { NotFoundException } from "@nestjs/common";
import { PopulationRepositoryInterface } from "../repositories/population-repository.interface";
import { PopulationResponse } from "../types/population.types";
import { GetPopulationPort, GetPopulationResult, GetPopulationUseCase } from "./usecases/get-population.usecase";

export class GetPopulationService implements GetPopulationUseCase {
    constructor(private readonly populationRepository: PopulationRepositoryInterface) {}

    async execute(payload: GetPopulationPort): Promise<GetPopulationResult> {
        const { coordinates1, coordinates2, guess } = payload;

        const populationResult: PopulationResponse = await this.populationRepository.getPopulation(
            coordinates1, coordinates2, guess
        );

        if(populationResult === null) throw new NotFoundException();

        // Update user metrics

        return { population: populationResult.population, score: populationResult.score, guess: guess };
    }
}
