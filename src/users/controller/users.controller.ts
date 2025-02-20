import { Body, Controller, Get, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { GetUserUseCase } from "../services/usecases/get-user.usecase";
import { UserDiTokens } from "../di/user-tokens.di";
import { User } from "../entities/user.entity";
import { SaveUserUseCase } from "../services/usecases/save-user.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserResponseDto } from "./dtos/get-user-response.dto";
import { CreateUserResponseDto } from "./dtos/create-user-response.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        @Inject(UserDiTokens.GetUserService)
        private readonly getUserService: GetUserUseCase,
        @Inject(UserDiTokens.SaveUserService)
        private readonly saveUserService: SaveUserUseCase
    ) { }

    @ApiResponse({ status: HttpStatus.OK, type: GetUserResponseDto })
    @Get('/:userId')
    async getUser(
        @Param('userId') userId: number
    ): Promise<User> {
        const user: User = await this.getUserService.execute({ id: userId });
        return user;
    }

    @ApiResponse({ status: HttpStatus.OK, type: CreateUserResponseDto })
    @Post('/')
    async createUser(
        @Body() user: User
    ): Promise<User> {
        const newUser: User = await this.saveUserService.execute(user);
        return newUser;
    }
}
