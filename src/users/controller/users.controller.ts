import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { GetUserUseCase } from "../services/usecases/get-user.usecase";
import { UserDiTokens } from "../di/user-tokens.di";
import { User } from "../entities/user.entity";
import { GetUserByEmailUseCase } from "../services/usecases/get-user-by-email.usecase";
import { SaveUserUseCase } from "../services/usecases/save-user.usecase";

@Controller('users')
export class UsersController {
    constructor(
        @Inject(UserDiTokens.GetUserService)
        private readonly getUserService: GetUserUseCase,
        @Inject(UserDiTokens.GetUserByEmailService)
        private readonly getUserByEmailService: GetUserByEmailUseCase,
        @Inject(UserDiTokens.SaveUserService)
        private readonly saveUserService: SaveUserUseCase
    ) {}

    @Get('/:userId')
    async getUser(
        @Param('userId') userId: number
    ): Promise<User> {
        const user: User = await this.getUserService.execute({ id: userId }); 
        return user;
    }

    @Get('/findUserByEmail/:email')
    async getUserByEmail(
        @Param('email') email: string
    ): Promise<User> {
        const user: User = await this.getUserByEmailService.execute({ email }); 
        return user;
    }

    @Post('/createUser')
    async createUser(
        @Body() user: User
    ): Promise<User> {
        const newUser: User = await this.saveUserService.execute(user);
        return newUser;
    }
}
