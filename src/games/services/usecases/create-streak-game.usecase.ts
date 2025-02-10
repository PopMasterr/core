import { UseCase } from "src/common/usecase.common";

export type CreateStreakGamePort = {
    userId: number
}

export interface CreateStreakGameUseCase extends UseCase<CreateStreakGamePort, void> {}
