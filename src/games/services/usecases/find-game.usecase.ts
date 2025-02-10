import { UseCase } from "src/common/usecase.common";

export type FindGameDTO = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface FindGameUseCase extends UseCase<number, FindGameDTO> {}
