import { UseCase } from "src/common/usecase.common";
import { TerritorySide } from "src/games/entities/types/create-streak-games-game-payload.type";

export type GetStreakAnswerIsCorrectPort = {
    userId: number;
    chosenTerritorySide: TerritorySide;
}

export type GetStreakAnswerIsCorrectDTO = {
    isCorrect: Boolean;
    populationBlue: number;
    populationRed: number;
    streak: number;
}

export interface GetStreakAnswerIsCorrectUseCase extends UseCase<GetStreakAnswerIsCorrectPort, GetStreakAnswerIsCorrectDTO> {}
