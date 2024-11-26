import { UseCase } from "src/common/usecase.common";

export type UpdateUserMetricsPort = {
    userId: number;
    score: number;
}

export interface UpdateUserMetricsUseCase extends UseCase<UpdateUserMetricsPort, void> {}
