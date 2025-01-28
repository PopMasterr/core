import { ClassicGame } from "../entities/classic-game.entity";

export interface ClassicGamesRepositoryInterface {
    save(classicGame: ClassicGame): Promise<ClassicGame>;
    findByUserId(userId: number): Promise<ClassicGame>;
}
