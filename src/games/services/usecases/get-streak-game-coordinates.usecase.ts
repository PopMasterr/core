import { UseCase } from "src/common/usecase.common";
import { GameDTO } from "./create-classic-game.usecase";

export type GetStreakGameCoordinatesPort = {
    userId: number;
}

export type GetStreakGameCoordinatesDTO = {
    gameBlueCoord: GameDTO;
    gameRedCoord: GameDTO;
}

export interface GetStreakGameCoordinatesUseCase extends UseCase<GetStreakGameCoordinatesPort, GetStreakGameCoordinatesDTO> {}