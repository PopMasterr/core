import { Body, Controller, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Query, Request } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateMultiplayerGamePort, CreateMultiplayerGameUseCase } from "../services/usecases/create-multiplayer-game.usecase";
import { GetMultiplayerGameCoordinatesUseCase } from "../services/usecases/get-multiplayer-game-coordinates.usecase";
import { GetMultiplayerGameScorePort, GetMultiplayerGameScoreUseCase } from "../services/usecases/get-multiplayer-game-score.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMultiplayerGameResponseDto } from "./dtos/create-multiplayer-game-response.dto";
import { GetMultiplayerGameCoordinatesResponseDto } from "./dtos/get-multiplayer-game-coordinates-response.dto";
import { GetMultiplayerGameScoreResponseDto } from "./dtos/get-multiplayer-game-score-response.dto";

@ApiTags('Multiplayer games')
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

    @ApiResponse({ status: HttpStatus.OK, type: CreateMultiplayerGameResponseDto })
    @Post()
    async createMultiplayerGame(
        @Body() payload: CreateMultiplayerGamePort
    ) {
        return await this.createMultiplayerGameService.execute(payload)
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetMultiplayerGameCoordinatesResponseDto })
    @Get('/:uniqueString/get_coordinates')
    async getCoordinates(
        @Param('uniqueString') uniqueString: string
    ) { 
        return await this.getMultiplayerGameCoordinatesService.execute({uniqueString: uniqueString});
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetMultiplayerGameScoreResponseDto })
    @Get('/:uniqueString/get_score')
    async getScore(
        @Request() req,
        @Param('uniqueString') uniqueString: string,
        @Query('populationGuess', ParseIntPipe) populationGuess: number,
        @Query('round', ParseIntPipe) round: number
    ) {
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
