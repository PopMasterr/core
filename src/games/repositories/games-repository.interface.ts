import { Game } from "../entities/game.entity";

export interface GameRepositoryInterface {
    save(game: Game): Promise<Game>;
    findById(id: number): Promise<Game>;
}