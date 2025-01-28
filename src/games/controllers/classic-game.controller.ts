import { Controller, Request, Inject, Post } from "@nestjs/common";
import { GameDiTokens } from "../di/game-tokens.di";
import { CreateClassicGameUseCase } from "../services/usecases/create-classic-game.usecase";

@Controller('classic_games')
export class ClassicGamesController {
    constructor(
        @Inject(GameDiTokens.CreateClassicGameService)
        private readonly createClassicGameService: CreateClassicGameUseCase
    ) { }

    @Post('')
    async createClassicGame(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.createClassicGameService.execute({ userId: userId });
    }
}