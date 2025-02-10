import { StreakGamesGame } from "src/games/entities/streak-games-game.entity";
import { StreakGamesGamesRepositoryInterface } from "../streak-games-games-repository.interface";
import { Repository } from "typeorm";

export class StreakGamesGamesRepository implements StreakGamesGamesRepositoryInterface {
    constructor(
        private readonly repository: Repository<StreakGamesGame>
    ) { }

    async save(streakGamesGames: Array<StreakGamesGame>): Promise<void> {
        await this.repository.save(streakGamesGames);
    }

    async findByStreakGameId(streakGameId: number): Promise<StreakGamesGame[]> {
        return await this.repository.find({ where: { streakGameId: streakGameId } })
    }

    async findLastTwoByStreakGameId(streakGameId: number): Promise<StreakGamesGame[]> {
        return await this.repository.find({ where: { streakGameId: streakGameId }, order: { id: 'DESC' }, take: 2 })
    }
}
