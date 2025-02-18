import { MultiplayerGame } from "../entities/multiplayer-game.entity";

export interface MultiplayerGamesRepositoryInterface {
    save(multiplayerGame: MultiplayerGame): Promise<MultiplayerGame>;
    findById(id: number): Promise<MultiplayerGame>;
}
