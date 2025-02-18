import { MultiplayerGamesGame } from "../entities/multiplayer-games-game.entity";

export interface MultiplayerGamesGamesRepositoryInterface {
    save(multiplayerGamesGame: MultiplayerGamesGame): Promise<void>;
    findAllByUniqueString(uniqueString: string): Promise<MultiplayerGamesGame[]>;
    findByUniqueStringAndRound(uniqueString: string, round: number): Promise<MultiplayerGamesGame>;
}