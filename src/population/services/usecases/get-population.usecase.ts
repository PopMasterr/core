import { UseCase } from "src/common/usecase.common";
import { Coordinates } from "src/population/types/population.types";

export type GetPopulationPort = {
    userId: number;
    coordinates1: Coordinates;
    coordinates2: Coordinates;
    guess: number;
}

export type GetPopulationResult = {
    population: number;
    guess: number;
    score: number;
}

export interface GetPopulationUseCase extends UseCase<GetPopulationPort, GetPopulationResult> {}
