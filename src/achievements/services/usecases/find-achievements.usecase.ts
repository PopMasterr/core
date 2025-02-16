import { Achievement } from "src/achievements/entities/achievement.entity";
import { UseCase } from "src/common/usecase.common";

export type FindAchievementsPort = {
    achievementIds: number[];
}

export interface FindAchievementsUseCase extends UseCase<FindAchievementsPort, Array<Achievement>> {}
