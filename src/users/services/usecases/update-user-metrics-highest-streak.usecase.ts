import { UseCase } from "src/common/usecase.common";

export type UpdateUserMetricsHighestStreakPort = {
    userId: number;
    streak: number; 
}

export interface UpdateUserMetricsHighestStreakUseCase extends UseCase<UpdateUserMetricsHighestStreakPort, void> {}