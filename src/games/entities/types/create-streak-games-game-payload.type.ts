export type CreateStreakGamesGamePayload = {
    streakGameId: number;
    gameId: number;
    territorySide: TerritorySide;
}

export enum TerritorySide {
    BLUE = 1,
    RED = 2
}