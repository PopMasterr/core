import { MultiplayerGame } from "../multiplayer-game.entity";

export type CreateMultiplayerGamesGamePayload = {
    gameId: number;
    round: number;
    multiplayerGame: MultiplayerGame;
}