import { BadRequestException, Body, Request, Controller, Inject, Post, UseGuards, Get } from "@nestjs/common";
import { AuthDITokens } from "../di/auth-tokens.di";
import { LoginUseCase } from "../services/usecases/login.usecase";
import { RegisterUseCase } from "../services/usecases/register.usecase";
import { AuthGuard } from "@nestjs/passport";
import { AccessToken } from "../types/access-token.types";
import { AccessTokenPayload } from "../types/access-token-payload.types";
import { User } from "src/users/entities/user.entity";
import { UserDiTokens } from "src/users/di/user-tokens.di";
import { GetUserByEmailUseCase } from "src/users/services/usecases/get-user-by-email.usecase";
import { SaveUserUseCase } from "src/users/services/usecases/save-user.usecase";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { Public } from "../metadata/public.meta";

@Controller("authentication")
export class AuthenticationController {
    constructor(
        @Inject(AuthDITokens.LoginService)
        private readonly loginService: LoginUseCase,
        @Inject(AuthDITokens.RegisterService)
        private readonly registerService: RegisterUseCase,
        @Inject(UserDiTokens.GetUserByEmailService)
        private readonly getUserByEmailService: GetUserByEmailUseCase,
        @Inject(UserDiTokens.SaveUserService)
        private readonly saveUserService: SaveUserUseCase
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(
        @Request() req
    ): Promise<AccessToken> {
        const user: User = req.user;
        const accessTokenPayload: AccessTokenPayload = {username: user.username, email: user.email, userId: user.id}

        const result: AccessToken = await this.loginService.execute(accessTokenPayload);

        return result;
    }

    @Public()
    @Post("/register")
    async register(
        @Body() payload: User
    ): Promise<User> {
        const existingUser = await this.getUserByEmailService.execute({email: payload.email});
        if (existingUser){ throw new BadRequestException("Email already taken") }

        const newUser: User = await this.registerService.execute(payload);
        await this.saveUserService.execute(newUser);

        return newUser;
    }

    @Get()
    async something () {
        return "wtf";
    }
}
