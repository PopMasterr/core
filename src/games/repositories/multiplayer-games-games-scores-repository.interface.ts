import { MultiplayerGamesGamesScore } from "../entities/multiplayer-games-games-score.entity";

export type SumsOfScores = { 
    userId: number, 
    totalScore: number 
}

export interface MultiplayerGamesGamesScoresRepositoryInterface {
    save(multiplayerGamesGamesScore: MultiplayerGamesGamesScore): Promise<void>;
    findByUniqueStringRoundAndUserId(uniqueString: string, round: number, userId: number): Promise<MultiplayerGamesGamesScore>;
    findScoresUpToRound(uniqueString: string, round: number, userId: number): Promise<MultiplayerGamesGamesScore[]>;
    findAllSumsOfScoresByUniqueStringUpToRound(uniqueString: string, round: number): Promise<SumsOfScores[]>;
}