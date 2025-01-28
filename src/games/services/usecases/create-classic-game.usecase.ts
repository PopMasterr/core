import { UseCase } from "src/common/usecase.common";
import { Game } from "src/games/entities/game.entity";

// hex architecture
export type CreateClassicGamePort = {
    userId: number;
}

export type ClassicGameDTO = {
    id: number;
    game: GameDTO;
}

export type GameDTO = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface CreateClassicGameUseCase extends UseCase<CreateClassicGamePort, ClassicGameDTO> {}