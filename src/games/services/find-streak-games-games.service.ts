import { NotFoundException } from "@nestjs/common";
import { StreakGame } from "../entities/streak-game.entity";
import { StreakGamesGame } from "../entities/streak-games-game.entity";
import { StreakGamesGamesRepositoryInterface } from "../repositories/streak-games-games-repository.interface";
import { StreakGamesRepositoryInterface } from "../repositories/streak-games-repository.interface";
import { FindStreakGamesGamesDTO, FindStreakGamesGamesPort, FindStreakGamesGamesUseCase } from "./usecases/find-streak-games-games.usecase";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";

export class FindStreakGamesGamesService implements FindStreakGamesGamesUseCase {
    constructor(
        private readonly streakGameRepository: StreakGamesRepositoryInterface,
        private readonly streakGamesGamesRepository: StreakGamesGamesRepositoryInterface,
        private readonly gamesRepository: GameRepositoryInterface
    ) { }

    async execute(payload?: FindStreakGamesGamesPort): Promise<FindStreakGamesGamesDTO> {
        const { userId } = payload;

        const streakGame: StreakGame = await this.streakGameRepository.findlastByUserId(userId);
        if (!streakGame) throw new NotFoundException();

        const streakGamesGame: StreakGamesGame[] = await this.streakGamesGamesRepository.findLastTwoByStreakGameId(streakGame.id);
        if (!streakGamesGame) throw new NotFoundException();

        return {
            streakGame: streakGame,
            games: [
                await this.gamesRepository.findById(streakGamesGame[0].gameId),
                await this.gamesRepository.findById(streakGamesGame[1].gameId)
            ]
        }
    }
}
