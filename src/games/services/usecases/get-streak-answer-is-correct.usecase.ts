import { UseCase } from "src/common/usecase.common";

export type GetStreakAnswerIsCorrectPort = {
    userId: number;
    // TODO: Convert to type that was chosen
    choseBlue: Boolean;
}

export type GetStreakAnswerIsCorrectDTO = {
    isCorrect: Boolean;
    populationBlue: number;
    populationRed: number;
    streak: number;
}

export interface GetStreakAnswerIsCorrectUseCase extends UseCase<GetStreakAnswerIsCorrectPort, GetStreakAnswerIsCorrectDTO> {}
