import { FindStreakGamesGamesUseCase } from "./usecases/find-streak-games-games.usecase";
import { GetStreakGameCoordinatesDTO, GetStreakGameCoordinatesPort, GetStreakGameCoordinatesUseCase } from "./usecases/get-streak-game-coordinates.usecase";

export class GetStreakGameCoordinatesService implements GetStreakGameCoordinatesUseCase {
    constructor(
        private readonly findStreakGamesGames: FindStreakGamesGamesUseCase
    ) { }

    async execute(payload?: GetStreakGameCoordinatesPort): Promise<GetStreakGameCoordinatesDTO> {
        const { userId } = payload;

        const { games } = await this.findStreakGamesGames.execute({ userId: userId });

        return {
            gameBlueCoord: {
                x1: games[1].x1,
                x2: games[1].x2,
                y1: games[1].y1,
                y2: games[1].y2
            },
            gameRedCoord: {
                x1: games[0].x1,
                x2: games[0].x2,
                y1: games[0].y1,
                y2: games[0].y2
            }
        }
    }
}
