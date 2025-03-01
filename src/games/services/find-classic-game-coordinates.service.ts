import { Game } from "../entities/game.entity";
import { ClassicGamesGamesRepositoryInterface } from "../repositories/classic-games-games-repository.interface";
import { ClassicGamesRepositoryInterface } from "../repositories/classic-games-repository.interface";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { FindGameDTO, FindClassicGameCoordinatesUseCase } from "./usecases/find-classic-game-coordinates.usecase";

export class FindClassicGameCoordinatesService implements FindClassicGameCoordinatesUseCase {
    constructor(
        private readonly clasicGameRepository: ClassicGamesRepositoryInterface,
        private readonly classicGamesGamesRepository: ClassicGamesGamesRepositoryInterface,
        private readonly gameRepository: GameRepositoryInterface,
    ) {}

    async execute(payload?: number): Promise<FindGameDTO> {
        const userId = payload;

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
