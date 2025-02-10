import { ClassicGamesRepositoryInterface } from "../classic-games-repository.interface";
import { Repository } from "typeorm";
import { ClassicGame } from "src/games/entities/classic-game.entity";

export class ClassicGamesRepository implements ClassicGamesRepositoryInterface {
    constructor (
        private readonly repository: Repository<ClassicGame>,
    ) {}
    
    async save(classicGame: ClassicGame): Promise<ClassicGame> {
        return await this.repository.save(classicGame);
    }

    async findLastByUserId(userId: number): Promise<ClassicGame> {
        return await this.repository.findOne({where: { userId: userId }, order: { id: 'DESC' }})
    }
}