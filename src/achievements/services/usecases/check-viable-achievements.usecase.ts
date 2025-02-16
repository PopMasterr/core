import { UseCase } from "src/common/usecase.common";
import { UserMetrics } from "src/users/entities/user-metrics.entity";

export type CheckViableAchievementsPort = {
    score: number;
    userMetrics: UserMetrics;
}

export interface CheckViableAchievementsUseCase extends UseCase<CheckViableAchievementsPort, any> {}
