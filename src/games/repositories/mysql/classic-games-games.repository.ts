import { ClassicGamesGame } from "src/games/entities/classic-games-game.entity";
import { ClassicGamesGamesRepositoryInterface } from "../classic-games-games-repository.interface";
import { Repository } from "typeorm";

export class ClassicGamesGameRepository implements ClassicGamesGamesRepositoryInterface {
    constructor(
        private readonly repository: Repository<ClassicGamesGame>
    ) { }

    async save(classicGameGame: ClassicGamesGame): Promise<void> {
        await this.repository.save(classicGameGame);
    }

    async findByClassicGameId(classicGameId: number): Promise<ClassicGamesGame[]> {
        return await this.repository.find({ where: { classicGameId: classicGameId } });
    }

    async findLastByClassicGameId(classicGameId: number): Promise<ClassicGamesGame> {
        return await this.repository.findOne({ where: { classicGameId: classicGameId }, order: { id: 'DESC' } });
    }

    async saveScoreById(id: number, score: number): Promise<void> {
        await this.repository.update({ id: id }, { score: score });
    }
}