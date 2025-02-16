import { rulesEngineInterface } from "../rules-engine/rules-engine.interface";
import { InitializeAchievmentsUseCase } from "./usecases/initialize-achievements.usecase";

export class InitializeAchievmentsService implements InitializeAchievmentsUseCase {
    constructor (
        private readonly rulesEngine: rulesEngineInterface
    ) {}

    async execute(): Promise<void> {
        await this.rulesEngine.createAchievements();
    }
}
