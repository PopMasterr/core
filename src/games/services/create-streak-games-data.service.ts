import { Game } from "../entities/game.entity";
import { StreakGamesGame } from "../entities/streak-games-game.entity";
import { TerritorySide } from "../entities/types/create-streak-games-game-payload.type";
import { StreakGamesGamesRepositoryInterface } from "../repositories/streak-games-games-repository.interface";
import { CreateGameUseCase } from "./usecases/create-game.usecase";
import { CrateStreakGameDataPort, CreateStreakGamesDataUseCase } from "./usecases/create-streak-games-data.usecase";

export class CreateStreakGamesDataService implements CreateStreakGamesDataUseCase {
    constructor(
        private readonly createGameService: CreateGameUseCase,
        private readonly streakGamesGamesRepository: StreakGamesGamesRepositoryInterface
    ) { }

    async execute(payload?: CrateStreakGameDataPort): Promise<StreakGamesGame[]> {
        const { streakGameId } = payload;

        const game1: Game = await this.createGameService.execute();
        const game2: Game = await this.createGameService.execute();

        const streakGamesGames: StreakGamesGame[] = [
            new StreakGamesGame({
                streakGameId: streakGameId,
                gameId: game1.id,
                territorySide: TerritorySide.BLUE,
            }),
            new StreakGamesGame({
                streakGameId: streakGameId,
                gameId: game2.id,
                territorySide: TerritorySide.RED,
            })
        ];

        await this.streakGamesGamesRepository.save(streakGamesGames);
        return streakGamesGames
    }
}
