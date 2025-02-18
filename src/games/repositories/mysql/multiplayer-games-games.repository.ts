import { MultiplayerGamesGame } from "src/games/entities/multiplayer-games-game.entity";
import { MultiplayerGamesGamesRepositoryInterface } from "../multiplayer-games-games-repository.interface";
import { Repository } from "typeorm";

export class MultiplayerGamesGamesRepository implements MultiplayerGamesGamesRepositoryInterface {
    constructor(
        private readonly repository: Repository<MultiplayerGamesGame>
    ) { }

    async save(multiplayerGamesGame: MultiplayerGamesGame): Promise<void> {
        await this.repository.save(multiplayerGamesGame);
    }

    async findAllByUniqueString(uniqueString: string): Promise<MultiplayerGamesGame[]> {
        return await this.repository
            .createQueryBuilder('multiplayerGamesGame')
            .leftJoinAndSelect('multiplayerGamesGame.multiplayerGame', 'multiplayerGame')
            .where('multiplayerGame.uniqueString = :uniqueString', { uniqueString })
            .getMany();
    }

    async findByUniqueStringAndRound(uniqueString: string, round: number): Promise<MultiplayerGamesGame> {
        return await this.repository
            .createQueryBuilder('multiplayerGamesGame')
            .leftJoinAndSelect('multiplayerGamesGame.multiplayerGame', 'multiplayerGame')
            .where('multiplayerGame.uniqueString = :uniqueString', { uniqueString })
            .andWhere('multiplayerGamesGame.round = :round', {round})
            .getOne();
    }
}