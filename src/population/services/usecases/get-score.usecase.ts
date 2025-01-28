import { UseCase } from "src/common/usecase.common";
import { PopulationResponse } from "src/population/types/population.types";

export type GetScorePort = {
    populationGuess: number;
    population: number;
}

export interface GetScoreUseCase extends UseCase<GetScorePort, PopulationResponse> {}