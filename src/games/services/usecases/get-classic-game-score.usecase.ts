import { UseCase } from "src/common/usecase.common";
import { PopulationResponse } from "src/population/types/population.types";

export type GetClassicGameScorePort = {
    userId: number;
    populationGuess: number;
}

export interface GetClassicGameScoreUseCase extends UseCase<GetClassicGameScorePort, PopulationResponse> {}
