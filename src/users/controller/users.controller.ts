import { Controller, Get, Inject, Param } from "@nestjs/common";
import { GetUserUseCase } from "../services/usecases/get-user.usecase";
import { UserDiTokens } from "../di/user-tokens.di";
import { User } from "../entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(
        @Inject(UserDiTokens.GetUserService)
        private readonly getUserService: GetUserUseCase
    ) {}

    @Get('/:userId')
    async getUser(
        @Param('userId') userId: number
    ): Promise<User> {
        const user: User = await this.getUserService.execute({ id: userId }); 
        return user;
    }    
}
