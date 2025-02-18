import { MultiplayerGamesGamesScore } from "src/games/entities/multiplayer-games-games-score.entity";
import { MultiplayerGamesGamesScoresRepositoryInterface, SumsOfScores } from "../multiplayer-games-games-scores-repository.interface";
import { Repository } from "typeorm";

export class MultiplayerGamesGamesScoresRepository implements MultiplayerGamesGamesScoresRepositoryInterface {
    constructor(
        private readonly repository: Repository<MultiplayerGamesGamesScore>
    ) { }

    async save(multiplayerGamesGamesScore: MultiplayerGamesGamesScore): Promise<void> {
        await this.repository.save(multiplayerGamesGamesScore)
    }

    async findByUniqueStringRoundAndUserId(uniqueString: string, round: number, userId: number): Promise<MultiplayerGamesGamesScore> {
        return await this.repository
            .createQueryBuilder('multiplayerGamesGamesScore')
            .leftJoinAndSelect('multiplayerGamesGamesScore.multiplayerGamesGame', 'multiplayerGamesGame')
            .leftJoinAndSelect('multiplayerGamesGame.multiplayerGame', 'multiplayerGame')
            .where('multiplayerGamesGamesScore.userId = :userId', { userId })
            .andWhere('multiplayerGame.uniqueString = :uniqueString', { uniqueString })
            .andWhere('multiplayerGamesGame.round = :round', { round })
            .getOne();
    }

    async findScoresUpToRound(uniqueString: string, round: number, userId: number): Promise<MultiplayerGamesGamesScore[]> {
        return await this.repository
            .createQueryBuilder('multiplayerGamesGamesScore')
            .leftJoinAndSelect('multiplayerGamesGamesScore.multiplayerGamesGame', 'multiplayerGamesGame')
            .leftJoinAndSelect('multiplayerGamesGame.multiplayerGame', 'multiplayerGame')
            .where('multiplayerGamesGamesScore.user_id = :userId', { userId })
            .andWhere('multiplayerGame.uniqueString = :uniqueString', { uniqueString })
            .andWhere('multiplayerGamesGame.round <= :round', { round })
            .orderBy('multiplayerGamesGame.round', 'ASC')
            .getMany();
    }

    async findAllSumsOfScoresByUniqueStringUpToRound(uniqueString: string, round: number): Promise<SumsOfScores[]> {
        return await this.repository
            .createQueryBuilder('multiplayerGamesGamesScore')
            .leftJoin('multiplayerGamesGamesScore.multiplayerGamesGame', 'multiplayerGamesGame')
            .leftJoin('multiplayerGamesGame.multiplayerGame', 'multiplayerGame')
            .select('multiplayerGamesGamesScore.userId', 'userId')
            .addSelect('SUM(multiplayerGamesGamesScore.score)', 'totalScore')
            .where('multiplayerGame.uniqueString = :uniqueString', { uniqueString })
            .andWhere('multiplayerGamesGame.round <= :round', { round })
            .groupBy('multiplayerGamesGamesScore.userId')
            .orderBy('totalScore', 'ASC')
            .getRawMany();
    }
}
