import { UserMetrics } from "../entities/user-metrics.entity";

export interface UserMetricsRepositoryInterface {
    saveEntity(userMetrics: UserMetrics): Promise<UserMetrics>;
    findByUserId(userId: number): Promise<UserMetrics>;
}
