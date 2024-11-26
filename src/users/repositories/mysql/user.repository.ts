import { User } from "src/users/entities/user.entity";
import { UserRepositoryInterface } from "../user-repository.interface";
import { Repository } from "typeorm";

export class UserRepository implements UserRepositoryInterface {
    constructor(private readonly repository: Repository<User>) {}

    saveEntity(user: User): Promise<User> {
        return this.repository.save(user);
    }

    findById(id: number): Promise<User> {
        return this.repository.findOneBy({ id: id });
    }
}
