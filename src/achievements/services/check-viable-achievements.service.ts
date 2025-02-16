import { FactsForRulesEngine, rulesEngineInterface } from "../rules-engine/rules-engine.interface";
import { CheckViableAchievementsPort, CheckViableAchievementsUseCase } from "./usecases/check-viable-achievements.usecase";

export class CheckViableAchievementsService implements CheckViableAchievementsUseCase {
    constructor(
        private readonly rulesEngine: rulesEngineInterface
    ) { }

    async execute(payload?: CheckViableAchievementsPort): Promise<any> {
        const { score, userMetrics } = payload;

        const dataForRulesEngine: FactsForRulesEngine = {
            score: score,
            gamesPlayed: userMetrics.gamesPlayed,
            perfectGuesses: userMetrics.perfectGuesses
        }

        return await this.rulesEngine.checkViableAchievements(dataForRulesEngine);
    }
}
