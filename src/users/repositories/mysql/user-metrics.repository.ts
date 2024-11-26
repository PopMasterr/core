import { UserMetrics } from "src/users/entities/user-metrics.entity";
import { UserMetricsRepositoryInterface } from "../user-metrics-repository.interface";
import { Repository } from "typeorm";

export class UserMetricsRepository implements UserMetricsRepositoryInterface {
    constructor(private readonly repository: Repository<UserMetrics>) {}

    async saveEntity(userMetrics: UserMetrics): Promise<UserMetrics> {
        return await this.repository.save(userMetrics);
    }

    async findByUserId(userId: number): Promise<UserMetrics> {
        return await this.repository.findOneBy({ userId: userId });
    }
}
