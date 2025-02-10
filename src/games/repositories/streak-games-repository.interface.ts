import { StreakGame } from "../entities/streak-game.entity";

export interface StreakGamesRepositoryInterface {
    save(streakGame: StreakGame): Promise<StreakGame>;
    findlastByUserId(userId: number): Promise<StreakGame>;
    updateStreakById(id: number): Promise<void>;
    setIsLostTrueById(id: number): Promise<void>;
    getStreakById(id: number): Promise<number>;
}
