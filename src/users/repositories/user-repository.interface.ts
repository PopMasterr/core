import { User } from "../entities/user.entity";

export interface UserRepositoryInterface {
    saveEntity(user: User): Promise<User>;
    findById(id: number): Promise<User>;
}
