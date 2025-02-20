import { Controller, Get, HttpStatus, Inject, Param, ParseBoolPipe, Post, Query, Request } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateStreakGameUseCase } from "../services/usecases/create-streak-game.usecase";
import { GetStreakAnswerIsCorrectUseCase } from "../services/usecases/get-streak-answer-is-correct.usecase";
import { GetStreakGameCoordinatesUseCase } from "../services/usecases/get-streak-game-coordinates.usecase";
import { TerritorySide } from "../entities/types/create-streak-games-game-payload.type";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetStreakAnswerIsCorrectResponseDto } from "./dtos/get-streak-answer-is-correct-response.dto";
import { GetStreakGameCoordinatesResponseDto } from "./dtos/get-streak-game-coordinates-response.dto";

@ApiTags('Streak games')
@Controller('streak_games')
export class StreakGamesController {
    constructor(
        @Inject(GameDiTokens.CreateStreakGameService)
        private readonly createStreakGameService: CreateStreakGameUseCase,
        @Inject(GameDiTokens.GetStreakAnswerIsCorrectService)
        private readonly getStreakAnswerIsCorrectService: GetStreakAnswerIsCorrectUseCase,
        @Inject(GameDiTokens.GetStreakGameCoordinatesService)
        private readonly getStreakGameCoordinatesService: GetStreakGameCoordinatesUseCase
    ) { }

    @ApiResponse({ status: HttpStatus.OK, type: null })
    @Post('/')
    async createStreakGame(
        @Request() req
    ) {
        const userId: number = req.user.userId;

        return await this.createStreakGameService.execute({ userId: userId });
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetStreakAnswerIsCorrectResponseDto })
    @Get('/check_answer')
    async getAnswerIsCorrect(
        @Request() req,
        @Query('territorySide', ParseBoolPipe) territorySide: Boolean
    ) {
        const userId = req.user.userId;
        const chosenTerritorySide = territorySide ? TerritorySide.BLUE : TerritorySide.RED;

        return await this.getStreakAnswerIsCorrectService.execute({ userId: userId, chosenTerritorySide: chosenTerritorySide });
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetStreakGameCoordinatesResponseDto })
    @Get('/get_coordinates')
    async getStreakGameCoordinates(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.getStreakGameCoordinatesService.execute({ userId: userId });
    }
}