import { UseCase } from "src/common/usecase.common";
import { GameDataResponse } from "src/population/types/population.types";

export interface GetGameDataUseCase extends UseCase<null, GameDataResponse> {} 