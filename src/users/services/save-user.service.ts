import { BadRequestException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { SaveUserPort, SaveUserUseCase } from "./usecases/save-user.usecase";
import { UserMetricsRepositoryInterface } from "../repositories/user-metrics-repository.interface";
import { UserMetrics } from "../entities/user-metrics.entity";

export class SaveUserService implements SaveUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly userMetricsRepository: UserMetricsRepositoryInterface
    ) {}

    async execute(payload: SaveUserPort): Promise<User> {
        const { username, email, password } = payload;

        const user: User = new User();
        user.username = username;
        user.email = email;
        user.password = password;

        const savedUser = await this.userRepository.saveEntity(user);
        if (savedUser === null) throw new BadRequestException();

        await this.createUserMetrics(savedUser.id);

        return savedUser;
    }

    private async createUserMetrics(userId: number): Promise<void> {
        const userMetrics: UserMetrics = new UserMetrics(userId);
        await this.userMetricsRepository.saveEntity(userMetrics);
    }
}
