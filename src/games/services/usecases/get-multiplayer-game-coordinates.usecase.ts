import { UseCase } from "src/common/usecase.common";
import { Coordinates } from "src/population/types/population.types";
import { GameDTO } from "./create-classic-game.usecase";

export type GetMultiplayerGameCoordinatesPort = {
    uniqueString: string;
}

export type GetMultiplayerGameCoordinatesDTO = {
    gameCoordinates: GameDTO[];
}

export interface GetMultiplayerGameCoordinatesUseCase extends UseCase<GetMultiplayerGameCoordinatesPort, GetMultiplayerGameCoordinatesDTO> {}
