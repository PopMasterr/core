import { StreakGame } from "src/games/entities/streak-game.entity";
import { StreakGamesRepositoryInterface } from "../streak-games-repository.interface";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

export class StreakGamesRepository implements StreakGamesRepositoryInterface {
    constructor(
        private readonly repository: Repository<StreakGame>
    ) { }

    async save(streakGame: StreakGame): Promise<StreakGame> {
        return await this.repository.save(streakGame);
    }

    async findlastByUserId(userId: number): Promise<StreakGame> {
        return await this.repository.findOne({ where: { userId: userId }, order: { id: 'DESC' } });
    }

    async updateStreakById(id: number): Promise<void> {
        await this.repository.increment({ id: id }, 'streak', 1);
    }

    async setIsLostTrueById(id: number): Promise<void> {
        await this.repository.update({ id: id }, { isLost: true });
    }

    async getStreakById(id: number): Promise<number> {
        const streakGame: StreakGame = await this.repository.findOne({ where: { id: id } })
        if (!streakGame) throw new NotFoundException();
        return streakGame.streak;
    }
}
