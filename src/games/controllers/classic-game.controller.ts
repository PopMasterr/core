import { Controller, Request, Inject, Post, Param, Get, ParseIntPipe, HttpStatus, Query } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateClassicGameUseCase } from "../services/usecases/create-classic-game.usecase";
import { GetClassicGameScoreUseCase } from "../services/usecases/get-classic-game-score.usecase";
import { FindClassicGameCoordinatesUseCase } from "../services/usecases/find-classic-game-coordinates.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateClassicGameResponseDto } from "./dtos/create-classic-game-response.dto";
import { GetClassicGameScoreResponseDto } from "./dtos/get-classic-game-score-response.dto";
import { FindClassicGameResponseDto } from "./dtos/find-classic-game-response.dto";

@ApiTags('Classic games')
@Controller('classic_games')
export class ClassicGamesController {
    constructor(
        @Inject(GameDiTokens.CreateClassicGameService)
        private readonly createClassicGameService: CreateClassicGameUseCase,
        @Inject(GameDiTokens.GetClassicGameScoreService)
        private readonly getClassicGameScoreService: GetClassicGameScoreUseCase,
        @Inject(GameDiTokens.FindGameService)
        private readonly findGameService: FindClassicGameCoordinatesUseCase
    ) { }

    @ApiResponse({ status: HttpStatus.OK, type: CreateClassicGameResponseDto })
    @Post('')
    async createClassicGame(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.createClassicGameService.execute({ userId: userId });
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetClassicGameScoreResponseDto })
    @Get('/score')
    async getClassicGameScore(
        @Request() req,
        @Query('populationGuess', ParseIntPipe) populationGuess: number
    ) {
        const userId = req.user.userId;

        return await this.getClassicGameScoreService.execute({ userId: userId, populationGuess: populationGuess });
    }

    @ApiResponse({ status: HttpStatus.OK, type: FindClassicGameResponseDto })
    @Get('')
    async findClassicGame(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.findGameService.execute(userId);
    }
}