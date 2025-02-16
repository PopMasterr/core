import { Module, Provider } from "@nestjs/common";
import { GameDiTokens } from "./di/game-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Game } from "./entities/game.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { GameRepository } from "./repositories/mysql/games.repository";
import { PopulationModule } from "src/population/population.module";
import { ClassicGame } from "./entities/classic-game.entity";
import { ClassicGamesRepository } from "./repositories/mysql/classic-games.repository";
import { ClassicGamesController } from "./controllers/classic-game.controller";
import { ClassicGamesGame } from "./entities/classic-games-game.entity";
import { ClassicGamesGameRepository } from "./repositories/mysql/classic-games-games.repository";
import { CreateGameService } from "./services/create-game.service";
import { GameRepositoryInterface } from "./repositories/games-repository.interface";
import { GetGameDataUseCase } from "src/population/services/usecases/get-game-data.usecase";
import { PopulationDITokens } from "src/population/di/population-tokens.di";
import { CreateClassicGameService } from "./services/create-classic-game.service";
import { ClassicGamesRepositoryInterface } from "./repositories/classic-games-repository.interface";
import { ClassicGamesGamesRepositoryInterface } from "./repositories/classic-games-games-repository.interface";
import { CreateGameUseCase } from "./services/usecases/create-game.usecase";
import { GetClassicGameScoreSerivce } from "./services/get-classic-game-score.service";
import { GetScoreUseCase } from "src/population/services/usecases/get-score.usecase";
import { FindClassicGameCoordinatesService } from "./services/find-classic-game-coordinates.service";
import { StreakGamesRepository } from "./repositories/mysql/streak-games.repository";
import { StreakGamesGame } from "./entities/streak-games-game.entity";
import { StreakGamesGamesRepository } from "./repositories/mysql/streak-games-games.repository";
import { CreateStreakGameService } from "./services/create-streak-game.service";
import { StreakGamesRepositoryInterface } from "./repositories/streak-games-repository.interface";
import { StreakGamesGamesRepositoryInterface } from "./repositories/streak-games-games-repository.interface";
import { StreakGamesController } from "./controllers/streak-game.controller";
import { StreakGame } from "./entities/streak-game.entity";
import { GetStreakAnswerIsCorrectService } from "./services/get-streak-answer-is-correct.service";
import { GetStreakGameCoordinatesService } from "./services/get-streak-game-coordinates.service";
import { UsersModule } from "src/users/users.module";
import { UpdateUserMetricsHighestStreakUseCase } from "src/users/services/usecases/update-user-metrics-highest-streak.usecase";
import { UserDiTokens } from "src/users/di/user-tokens.di";
import { CreateStreakGamesDataUseCase } from "./services/usecases/create-streak-games-data.usecase";
import { CreateStreakGamesDataService } from "./services/create-streak-games-data.service";
import { FindStreakGamesGamesService } from "./services/find-streak-games-games.service";
import { FindStreakGamesGamesUseCase } from "./services/usecases/find-streak-games-games.usecase";

const repositoryProviders: Array<Provider> = [
    {
        provide: GameDiTokens.MySQLGamesRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Game),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: GameDiTokens.GamesRepositoryInterface,
        useFactory: (repository: Repository<Game>) => new GameRepository(repository),
        inject: [GameDiTokens.MySQLGamesRepositoryInterface]
    },
    {
        provide: GameDiTokens.MySQLClassicGamesRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClassicGame),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: GameDiTokens.ClassicGamesRepositoryInterface,
        useFactory: (repository: Repository<ClassicGame>) => new ClassicGamesRepository(repository),
        inject: [GameDiTokens.MySQLClassicGamesRepositoryInterface]
    },
    {
        provide: GameDiTokens.MySQLClassicGamesGameRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClassicGamesGame),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: GameDiTokens.ClassicGamesGameRepositoryInterface,
        useFactory: (repository: Repository<ClassicGamesGame>) => new ClassicGamesGameRepository(repository),
        inject: [GameDiTokens.MySQLClassicGamesGameRepositoryInterface]
    },
    {
        provide: GameDiTokens.MySQLStreakGamesRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(StreakGame),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: GameDiTokens.StreakGamesRepositoryInterface,
        useFactory: (repository: Repository<StreakGame>) => new StreakGamesRepository(repository),
        inject: [GameDiTokens.MySQLStreakGamesRepositoryInterface]
    },
    {
        provide: GameDiTokens.MySQLStreakGamesGameRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(StreakGamesGame),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: GameDiTokens.StreakGamesGameRepositoryInterface,
        useFactory: (repository: Repository<StreakGamesGame>) => new StreakGamesGamesRepository(repository),
        inject: [GameDiTokens.MySQLStreakGamesGameRepositoryInterface]
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: GameDiTokens.CreateGameService,
        useFactory: (
            gameRepository: GameRepositoryInterface, getGameDataService: GetGameDataUseCase
        ) => new CreateGameService(gameRepository, getGameDataService),
        inject: [
            GameDiTokens.GamesRepositoryInterface,
            PopulationDITokens.GetGameDataService
        ]
    },
    {
        provide: GameDiTokens.CreateClassicGameService,
        useFactory: (
            classicGamesRepository: ClassicGamesRepositoryInterface,
            classicGamesGamesRepository: ClassicGamesGamesRepositoryInterface,
            createGameService: CreateGameUseCase
        ) => new CreateClassicGameService(classicGamesRepository, classicGamesGamesRepository, createGameService),
        inject: [
            GameDiTokens.ClassicGamesRepositoryInterface,
            GameDiTokens.ClassicGamesGameRepositoryInterface,
            GameDiTokens.CreateGameService
        ]
    },
    {
        provide: GameDiTokens.GetClassicGameScoreService,
        useFactory: (
            getScoreService: GetScoreUseCase,
            gameRepository: GameRepositoryInterface,
            classicGamesRepository: ClassicGamesRepositoryInterface,
            classicGamesGameRepository: ClassicGamesGamesRepositoryInterface,
            createGameService: CreateGameUseCase
        ) => new GetClassicGameScoreSerivce(getScoreService, gameRepository, classicGamesRepository, classicGamesGameRepository, createGameService),
        inject: [
            PopulationDITokens.GetScoreService,
            GameDiTokens.GamesRepositoryInterface,
            GameDiTokens.ClassicGamesRepositoryInterface,
            GameDiTokens.ClassicGamesGameRepositoryInterface,
            GameDiTokens.CreateGameService
        ]
    },
    {
        provide: GameDiTokens.FindGameService,
        useFactory: (
            classicGameRepositoy: ClassicGamesRepositoryInterface,
            classicGamesGameRepository: ClassicGamesGamesRepositoryInterface,
            gamesRepository: GameRepositoryInterface
        ) => new FindClassicGameCoordinatesService(classicGameRepositoy, classicGamesGameRepository, gamesRepository),
        inject: [
            GameDiTokens.ClassicGamesRepositoryInterface,
            GameDiTokens.ClassicGamesGameRepositoryInterface,
            GameDiTokens.GamesRepositoryInterface
        ]
    },
    {
        provide: GameDiTokens.CreateStreakGameService,
        useFactory: (
            streakGameRepository: StreakGamesRepositoryInterface,
            streakGamesGamesRepository: StreakGamesGamesRepositoryInterface,
            createStreakGamesDataService: CreateStreakGamesDataUseCase
        ) => new CreateStreakGameService(streakGameRepository, streakGamesGamesRepository, createStreakGamesDataService),
        inject: [
            GameDiTokens.StreakGamesRepositoryInterface,
            GameDiTokens.StreakGamesGameRepositoryInterface,
            GameDiTokens.CreateStreakGamesDataService
        ]
    },
    {
        provide: GameDiTokens.GetStreakAnswerIsCorrectService,
        useFactory: (
            streakGameRepository: StreakGamesRepositoryInterface,
            updateUserMetricsHighestStreakService: UpdateUserMetricsHighestStreakUseCase,
            createStreakGamesDataService: CreateStreakGamesDataUseCase,
            findStreakGamesGamesService: FindStreakGamesGamesUseCase
        ) => new GetStreakAnswerIsCorrectService(streakGameRepository, updateUserMetricsHighestStreakService, createStreakGamesDataService, findStreakGamesGamesService),
        inject: [
            GameDiTokens.StreakGamesRepositoryInterface,
            UserDiTokens.UpdateUserMetricsHighestStreakService,
            GameDiTokens.CreateStreakGamesDataService,
            GameDiTokens.FindStreakGamesGamesService
        ]
    },
    {
        provide: GameDiTokens.GetStreakGameCoordinatesService,
        useFactory: (
            findStreakGamesGamesService: FindStreakGamesGamesUseCase
        ) => new GetStreakGameCoordinatesService(findStreakGamesGamesService),
        inject: [
            GameDiTokens.FindStreakGamesGamesService
        ]
    },
    {
        provide: GameDiTokens.CreateStreakGamesDataService,
        useFactory: (createGameService: CreateGameUseCase) => new CreateStreakGamesDataService(createGameService),
        inject: [GameDiTokens.CreateGameService]
    },
    {
        provide: GameDiTokens.FindStreakGamesGamesService,
        useFactory: (
            streakGamesRepository: StreakGamesRepositoryInterface,
            streakGamesGamesRepository: StreakGamesGamesRepositoryInterface,
            gamesRepository: GameRepositoryInterface
        ) => new FindStreakGamesGamesService(streakGamesRepository, streakGamesGamesRepository, gamesRepository),
        inject: [
            GameDiTokens.StreakGamesRepositoryInterface,
            GameDiTokens.StreakGamesGameRepositoryInterface,
            GameDiTokens.GamesRepositoryInterface
        ]
    }
]

@Module({
    controllers: [ClassicGamesController, StreakGamesController],
    providers: [...repositoryProviders, ...serviceProviders],
    imports: [PopulationModule, UsersModule]
})
export class GamesModule { }
