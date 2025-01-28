import { ClassicGamesGame } from "../entities/classic-games-game.entity";

export interface ClassicGamesGamesRepositoryInterface {
    save(classicGameGame: ClassicGamesGame): Promise<void>;
    findByClassicGameId(classicGameId: number): Promise<ClassicGamesGame[]>;
    findLastByClassicGameId(classicGameId: number): Promise<ClassicGamesGame>;
}