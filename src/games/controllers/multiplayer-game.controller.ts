import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Request } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateMultiplayerGamePort, CreateMultiplayerGameUseCase } from "../services/usecases/create-multiplayer-game.usecase";
import { GetMultiplayerGameCoordinatesUseCase } from "../services/usecases/get-multiplayer-game-coordinates.usecase";
import { GetMultiplayerGameScorePort, GetMultiplayerGameScoreUseCase } from "../services/usecases/get-multiplayer-game-score.usecase";

@Controller('multiplayer_games')
export class MultiplayerGamesController {
    constructor(
        @Inject(GameDiTokens.CreateMultiplayerGameService)
        private readonly createMultiplayerGameService: CreateMultiplayerGameUseCase,
        @Inject(GameDiTokens.GetMultiplayerGameCoordinatesService)
        private readonly getMultiplayerGameCoordinatesService: GetMultiplayerGameCoordinatesUseCase,
        @Inject(GameDiTokens.GetMultiplayerGameScoreService)
        private readonly getMultiplayerGameScore: GetMultiplayerGameScoreUseCase
    ) { }

    @Post()
    async createMultiplayerGame(
        @Request() req,
        @Body() payload: CreateMultiplayerGamePort
    ) {
        return await this.createMultiplayerGameService.execute(payload)
    }

    @Get('/get_coordinates/:uniqueString')
    async getCoordinates(
        @Param('uniqueString') uniqueString: string
    ) { 
        return await this.getMultiplayerGameCoordinatesService.execute({uniqueString: uniqueString});
    }

    @Get('/get_score/:uniqueString/:populationGuess/:round')
    async getScore(
        @Request() req,
        @Param('uniqueString') uniqueString: string,
        @Param('populationGuess', ParseIntPipe) populationGuess: number,
        @Param('round', ParseIntPipe) round: number

    ) {
        round -= 1

        const userId = req.user.userId;

        const payload: GetMultiplayerGameScorePort = {
            populationGuess,
            round,
            uniqueString,
            userId
        };

        return await this.getMultiplayerGameScore.execute(payload);
    }
}
