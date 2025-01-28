import { User } from "src/users/entities/user.entity";
import { AuthRepositoryInterface } from "../auth-repository.interface";
import { JwtService } from "@nestjs/jwt"
import { AccessToken } from "src/authentication/types/access-token.types";
import { AccessTokenPayload } from "src/authentication/types/access-token-payload.types";
import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
 
@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async validateUser(inputedPassword: string, correctPassword: string): Promise<Boolean> {
        const result = await bcrypt.compareSync(inputedPassword, correctPassword);
        return result;
    }

    async login(user: AccessTokenPayload): Promise<AccessToken> {
        const payload = { username: user.username, email: user.email, userId: user.userId };

        return { accessToken: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }) };
    }

    async register(user: User): Promise<User> {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        const newUser: User = {...user, password: hashedPassword};
        return newUser;
    }
}