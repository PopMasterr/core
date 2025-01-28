import { Repository, UpdateResult } from "typeorm";
import { GameRepositoryInterface } from "../games-repository.interface";
import { Game } from "src/games/entities/game.entity";

export class GameRepository implements GameRepositoryInterface {
    constructor (
        private readonly repository: Repository<Game>
    ) {}
    
    save(game: Game): Promise<Game> {
        return this.repository.save(game);
    }

    findById(id: number): Promise<Game> {
        return this.repository.findOneBy({ id: id })
    }
    
}