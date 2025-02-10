import { UseCase } from "src/common/usecase.common";
import { Game } from "src/games/entities/game.entity";

export interface CreateGameUseCase extends UseCase<undefined, Game> {}
