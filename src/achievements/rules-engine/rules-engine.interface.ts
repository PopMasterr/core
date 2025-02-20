export type FactsForRulesEngine = {
    gamesPlayed: number;
    perfectGuesses: number;
    score: number;
}

export interface rulesEngineInterface {
    createAchievements(): Promise<void>;
    checkViableAchievements(checkViableAchievementsPort: FactsForRulesEngine): Promise<Array<number>>;
}
