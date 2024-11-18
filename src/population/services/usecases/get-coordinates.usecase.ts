import { UseCase } from "src/common/usecase.common";
import { CoordinatesResponse } from "src/population/types/population.types";

export interface GetCoordinatesUseCase extends UseCase<undefined, CoordinatesResponse> {}
