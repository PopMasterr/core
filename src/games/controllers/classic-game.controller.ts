import { Controller, Request, Inject, Post, Param, Get, ParseIntPipe } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateClassicGameUseCase } from "../services/usecases/create-classic-game.usecase";
import { GetClassicGameScoreUseCase } from "../services/usecases/get-classic-game-score.usecase";
import { FindGameUseCase } from "../services/usecases/find-game.usecase";

@Controller('classic_games')
export class ClassicGamesController {
    constructor(
        @Inject(GameDiTokens.CreateClassicGameService)
        private readonly createClassicGameService: CreateClassicGameUseCase,
        @Inject(GameDiTokens.GetClassicGameScoreService)
        private readonly getClassicGameScoreService: GetClassicGameScoreUseCase,
        @Inject(GameDiTokens.FindGameService)
        private readonly findGameService: FindGameUseCase
    ) { }

    @Post('/create_classic_game')
    async createClassicGame(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.createClassicGameService.execute({ userId: userId });
    }

    @Get('/score/:populationGuess')
    async getClassicGameScore(
        @Request() req,
        @Param('populationGuess', ParseIntPipe) populationGuess: number
    ) {
        const userId = req.user.userId;

        return await this.getClassicGameScoreService.execute({ userId: userId, populationGuess: populationGuess });
    }

    @Get('/find_classic_game')
    async findClassicGame(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.findGameService.execute(userId);
    }
}