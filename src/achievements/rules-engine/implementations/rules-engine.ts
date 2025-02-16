import { Engine } from "json-rules-engine";
import { AchievementRepositoryInterface } from "../../repositories/achievement-repository.interface";
import { Achievement } from "../../entities/achievement.entity";
import { FactsForRulesEngine, rulesEngineInterface } from "../rules-engine.interface";

export interface Rule {
    conditions: {
        all: Array<{
            fact: string;
            operator: string;
            value: number;
        }>;
    };
    event: {
        type: string;
        params: {
            message: string;
            achievementId: number;
        };
    };
}

export type rulesEngineRunResult = {
    type: string;
    params: {
        message: string,
        achievementId: number,
    };
}

export class RulesEngine implements rulesEngineInterface {
    private engine: Engine = new Engine();

    private firstGuessRule: Rule = {
        conditions: {
            all: [{
                fact: 'gamesPlayed',
                operator: 'greaterThanInclusive',
                value: 1
            }]
        },
        event: {
            type: 'firstGuess',
            params: {
                message: 'Make your first guess',
                achievementId: 1
            }
        }
    };

    private bullseye: Rule = {
        conditions: {
            all: [{
                fact: 'perfectGuesses',
                operator: 'greaterThanInclusive',
                value: 1
            }]
        },
        event: {
            type: 'bullseye',
            params: {
                message: 'Guess within 1% of the actual population for the first time',
                achievementId: 2
            }
        }
    };

    private doubleAce: Rule = {
        conditions: {
            all: [{
                fact: 'perfectGuesses',
                operator: 'greaterThanInclusive',
                value: 10
            }]
        },
        event: {
            type: 'doubleAce',
            params: {
                message: 'Guess within 5% of the actual population 10 times (10 perfect guesses)',
                achievementId: 3
            }
        }
    };

    private blindShot: Rule = {
        conditions: {
            all: [{
                fact: 'score',
                operator: 'equal',
                value: 0
            }]
        },
        event: {
            type: 'blindShot',
            params: {
                message: 'Make a guess that\'s off by more than 95% (get score 0)',
                achievementId: 4
            }
        }
    };

    private rookie: Rule = {
        conditions: {
            all: [{
                fact: 'gamesPlayed',
                operator: 'greaterThanInclusive',
                value: 10
            }]
        },
        event: {
            type: 'rookie',
            params: {
                message: 'Play 10 rounds',
                achievementId: 5
            }
        }
    };

    private broker: Rule = {
        conditions: {
            all: [{
                fact: 'gamesPlayed',
                operator: 'greaterThanInclusive',
                value: 50
            }]
        },
        event: {
            type: 'broker',
            params: {
                message: 'Play 50 rounds',
                achievementId: 6
            }
        }
    };

    private veteran: Rule = {
        conditions: {
            all: [{
                fact: 'gamesPlayed',
                operator: 'greaterThanInclusive',
                value: 100
            }]
        },
        event: {
            type: 'veteran',
            params: {
                message: 'Play 100 rounds',
                achievementId: 7
            }
        }
    };

    private no: Rule = {
        conditions: {
            all: [{
                fact: 'gamesPlayed',
                operator: 'greaterThanInclusive',
                value: 1337
            }]
        },
        event: {
            type: 'no',
            params: {
                message: 'Play 1337 rounds',
                achievementId: 8
            }
        }
    };

    private allRules: Rule[] = [
        this.firstGuessRule,
        this.bullseye,
        this.doubleAce,
        this.blindShot,
        this.rookie,
        this.broker,
        this.veteran,
        this.no
    ];

    constructor(
        private readonly achievementsRepository: AchievementRepositoryInterface
    ) {
        for (const rule of this.allRules) {
            this.engine.addRule(rule);
        }
    }

    // TODO: on app start call this method
    async createAchievements(): Promise<void> {
        for (const rule of this.allRules) {
            let achievement: Achievement = new Achievement();
            achievement.description = rule.event.params.message;
            achievement.name = rule.event.type;

            await this.achievementsRepository.save(achievement)
        }
    }

    async checkViableAchievements(payload: FactsForRulesEngine): Promise<Array<number>> {
        const results = await this.engine.run(payload);
        if (!results) return;

        const viableAchievements: number[] = results.events.map(event => event.params.achievementId);
        return viableAchievements;
    }
}
