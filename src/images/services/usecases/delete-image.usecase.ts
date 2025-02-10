import { UseCase } from "src/common/usecase.common";

export type DeleteImagePort = {
    userId: number;
}

export interface DeleteImageUseCase extends UseCase<DeleteImagePort, void> {}
