import { ClassicGame } from "../entities/classic-game.entity";
import { ClassicGamesGame } from "../entities/classic-games-game.entity";
import { Game } from "../entities/game.entity";
import { ClassicGamesGamesRepositoryInterface } from "../repositories/classic-games-games-repository.interface";
import { ClassicGamesRepositoryInterface } from "../repositories/classic-games-repository.interface";
import { ClassicGameDTO, CreateClassicGamePort, CreateClassicGameUseCase } from "./usecases/create-classic-game.usecase";
import { CreateGameUseCase } from "./usecases/create-game.usecase";

export class CreateClassicGameService implements CreateClassicGameUseCase {
    constructor(
        private readonly classicGamesRepository: ClassicGamesRepositoryInterface,
        private readonly classicGamesGamesRepository: ClassicGamesGamesRepositoryInterface,
        private readonly createGameService: CreateGameUseCase
    ) { }

    async execute(payload: CreateClassicGamePort): Promise<ClassicGameDTO> {
        const { userId } = payload;

        const classicGame: ClassicGame = await this.createClassicGame(userId);
        const game: Game = await this.createGameService.execute();
        await this.assignGameToClassicGame(classicGame.id, game.id);

        return {
            id: classicGame.id,
            game: { x1: game.x1, x2: game.x2, y1: game.y1, y2: game.y2 }
        };
    }

    private async createClassicGame(userId: number): Promise<ClassicGame> {
        const classicGame: ClassicGame = new ClassicGame();
        classicGame.userId = userId;
        return await this.classicGamesRepository.save(classicGame);
    }

    private async assignGameToClassicGame(classicGameId: number, gameId: number): Promise<void> {
        const classicGamesGame: ClassicGamesGame = new ClassicGamesGame({
            classicGameId: classicGameId,
            gameId: gameId
        })
        await this.classicGamesGamesRepository.save(classicGamesGame);
    }
}