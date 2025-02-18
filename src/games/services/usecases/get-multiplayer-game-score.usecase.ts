import { UseCase } from "src/common/usecase.common";

export type GetMultiplayerGameScorePort = {
    uniqueString: string;
    round: number;
    userId: number;
    populationGuess: number;
}

export type GetMultiplayerGameScoreDTO = {
    currentGameScore: number;
    sumsOfScores: UsernameAndScore[];
    currentGamePopulation: number;
}

export type UsernameAndScore = {
    username: string;
    score: number;
}

export interface GetMultiplayerGameScoreUseCase extends UseCase<GetMultiplayerGameScorePort, GetMultiplayerGameScoreDTO> {}
