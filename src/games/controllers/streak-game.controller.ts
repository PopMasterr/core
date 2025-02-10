import { Controller, Get, Inject, Param, ParseBoolPipe, Post, Request } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateStreakGameUseCase } from "../services/usecases/create-streak-game.usecase";
import { GetStreakAnswerIsCorrectUseCase } from "../services/usecases/get-streak-answer-is-correct.usecase";
import { GetStreakGameCoordinatesUseCase } from "../services/usecases/get-streak-game-coordinates.usecase";

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

    @Post('/create_streak_game')
    async createStreakGame(
        @Request() req
    ) {
        const userId: number = req.user.userId;

        return await this.createStreakGameService.execute({ userId: userId });
    }

    @Get('/get_answer_is_correct/:choseBlue')
    async getAnswerIsCorrect(
        @Request() req,
        @Param('choseBlue', ParseBoolPipe) choseBlue: Boolean
    ) {
        const userId = req.user.userId;

        return await this.getStreakAnswerIsCorrectService.execute({ userId: userId, choseBlue: choseBlue })
    }

    @Get('/get_streak_game_coordinates')
    async getStreakGameCoordinates(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.getStreakGameCoordinatesService.execute({ userId: userId });
    }
}