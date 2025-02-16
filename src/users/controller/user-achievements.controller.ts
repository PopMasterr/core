import { Controller, Get, Inject, Request } from "@nestjs/common";
import { UserDiTokens } from "../di/user-tokens.di";
import { FindUserAchivemenetsUseCase } from "../services/usecases/find-user-achievements.usecase";

@Controller('user_achievements')
export class UserAchievmentsController {
    constructor(
        @Inject(UserDiTokens.FindUserAchievementsService)
        private readonly findUserAchievementsService: FindUserAchivemenetsUseCase
    ) { }

    @Get('')
    async getUserAchievements(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.findUserAchievementsService.execute({ userId: userId });
    }
}
