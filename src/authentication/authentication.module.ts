import { Inject, Module, Provider } from "@nestjs/common";
import { AuthDITokens } from "./di/auth-tokens.di";
import { DataSource } from "typeorm";
import { AuthRepositoryInterface } from "./repositories/auth-repository.interface";
import { AuthRepository } from "./repositories/auth-service/auth.repository";
import { ValidateUserService } from "./services/validate-user.serivce";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { LoginService } from "./services/login.service";
import { RegisterService } from "./services/register.service";
import { UsersModule } from "src/users/users.module";
import { AuthenticationController } from "./controller/authentication.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt.guard";

const repositoryProviders: Array<Provider> = [
    {
        provide: AuthDITokens.AuthRepositoryInterface,
        useFactory: (jwtService: JwtService) => new AuthRepository(jwtService),
        inject: [JwtService]
    }
];

const serviceProviders: Array<Provider> = [
    {
        provide: AuthDITokens.ValidateUserService,
        useFactory: (authRepository: AuthRepositoryInterface) => new ValidateUserService(authRepository),
        inject: [AuthDITokens.AuthRepositoryInterface]
    },
    {
        provide: AuthDITokens.LoginService,
        useFactory: (authRepository: AuthRepositoryInterface) => new LoginService(authRepository),
        inject: [AuthDITokens.AuthRepositoryInterface]
    },
    {
        provide: AuthDITokens.RegisterService,
        useFactory: (authRepository: AuthRepositoryInterface) => new RegisterService(authRepository),
        inject: [AuthDITokens.AuthRepositoryInterface]
    }
];

@Module({
    controllers: [AuthenticationController],
    providers: [
        ...repositoryProviders,
        ...serviceProviders,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: 3600 },
        }),
    ],
})
export class AuthenticationModule { }