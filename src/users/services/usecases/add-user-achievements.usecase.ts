import { UseCase } from "src/common/usecase.common";

export type AddUserAchievementsPort = {
    userId: number;
    score: number;
}

export interface AddUserAchievementsUseCase extends UseCase<AddUserAchievementsPort, void> {}