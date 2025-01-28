import { GetGameDataUseCase } from "src/population/services/usecases/get-game-data.usecase";
import { Game } from "../entities/game.entity";
import { GameRepositoryInterface } from "../repositories/games-repository.interface";
import { CreateGameUseCase } from "./usecases/create-game.usecase";
import { GameDataResponse } from "src/population/types/population.types";

export class CreateGameService implements CreateGameUseCase {
    constructor (
        private readonly gameRepository: GameRepositoryInterface,
        private readonly getGameDataService: GetGameDataUseCase
    ) {}
    
    async execute(): Promise<Game> {
        const gameData: GameDataResponse = await this.getGameDataService.execute();

        const game: Game = new Game({
            population: gameData.population,
            x1: gameData.x1,
            x2: gameData.x2,
            y1: gameData.y1,
            y2: gameData.y2,
        });

        return await this.gameRepository.save(game);
    }

}
