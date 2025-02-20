import { Controller, Get, HttpStatus, Inject, Request } from "@nestjs/common";
import { UserDiTokens } from "../di/user-tokens.di";
import { FindUserAchivemenetsUseCase } from "../services/usecases/find-user-achievements.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserAchievementsResponseDto } from "./dtos/get-user-achievements-response.dto";

@ApiTags('User Achievments')
@Controller('user_achievements')
export class UserAchievmentsController {
    constructor(
        @Inject(UserDiTokens.FindUserAchievementsService)
        private readonly findUserAchievementsService: FindUserAchivemenetsUseCase
    ) { }

    @ApiResponse({ status: HttpStatus.OK, type: GetUserAchievementsResponseDto })
    @Get('')
    async getUserAchievements(
        @Request() req
    ) {
        const userId = req.user.userId;

        return await this.findUserAchievementsService.execute({ userId: userId });
    }
}
