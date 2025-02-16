import { UseCase } from "src/common/usecase.common";
import { StreakGamesGame } from "src/games/entities/streak-games-game.entity";

export type CrateStreakGameDataPort = {
    streakGameId: number
}

export interface CreateStreakGamesDataUseCase extends UseCase<CrateStreakGameDataPort, Array<StreakGamesGame>> {}
