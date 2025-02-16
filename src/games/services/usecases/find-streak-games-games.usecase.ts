import { UseCase } from "src/common/usecase.common";
import { Game } from "src/games/entities/game.entity";
import { StreakGame } from "src/games/entities/streak-game.entity";

export type FindStreakGamesGamesPort = {
    userId: number;
}

export type FindStreakGamesGamesDTO = {
    streakGame: StreakGame;
    games: Game[];
}

export interface FindStreakGamesGamesUseCase extends UseCase<FindStreakGamesGamesPort, FindStreakGamesGamesDTO> {}