import { Game } from "../entities/game.entity";
import { ClassicGamesGamesRepositoryInterface } from "../repositories/classic-games-games-repository.interface";
import { ClassicGamesRepositoryInterface } from "../repositories/classic-games-repository.interface";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { FindGameDTO, FindGameUseCase } from "./usecases/find-game.usecase";

// TODO: Specify classic as this service is used to get classic games
export class FindGameService implements FindGameUseCase {
    constructor(
        private readonly clasicGameRepository: ClassicGamesRepositoryInterface,
        private readonly classicGamesGamesRepository: ClassicGamesGamesRepositoryInterface,
        private readonly gameRepository: GameRepositoryInterface,
    ) {}

    async execute(payload?: number): Promise<FindGameDTO> {
        const userId = payload;

        // TODO: Read on how to do joins with typeorm
        const classicGameId: number = (await this.clasicGameRepository.findLastByUserId(userId)).id;
        const gameId: number = (await this.classicGamesGamesRepository.findLastByClassicGameId(classicGameId)).gameId;
        const game: Game = await this.gameRepository.findById(gameId);

        return {
            x1: game.x1,
            y1: game.y1,
            x2: game.x2,
            y2: game.y2
        };
    }
}
