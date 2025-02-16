import { UseCase } from "src/common/usecase.common";

export type FindUserAchievementsPort = {
    userId: number;
}

export type FindUserAchievementsDTO = {
    achievementName: string;
    achievementDescription: string;
}

export interface FindUserAchivemenetsUseCase extends UseCase<FindUserAchievementsPort, FindUserAchievementsDTO[]> {}