import { MultiplayerGame } from "src/games/entities/multiplayer-game.entity";
import { MultiplayerGamesRepositoryInterface } from "../multiplayer-games-repository.interface";
import { Repository } from "typeorm";

export class MultiplayerGamesRepository implements MultiplayerGamesRepositoryInterface {
    constructor(
        private readonly repository: Repository<MultiplayerGame>
    ) { }

    async save(multiplayerGame: MultiplayerGame): Promise<MultiplayerGame> {
        return await this.repository.save(multiplayerGame);
    }

    async findById(id: number): Promise<MultiplayerGame> {
        return await this.repository.findOne({ where: { id: id } });
    }
}
