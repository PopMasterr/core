import { StreakGamesGame } from "../entities/streak-games-game.entity";

export interface StreakGamesGamesRepositoryInterface {
    save(streakGamesGames: Array<StreakGamesGame>): Promise<void>;
    findByStreakGameId(streakGameId: number): Promise<StreakGamesGame[]>;
    findLastTwoByStreakGameId(streakGameId: number): Promise<StreakGamesGame[]>
}
