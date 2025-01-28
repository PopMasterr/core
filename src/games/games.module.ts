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
    }
]

@Module({
    controllers: [ClassicGamesController],
    providers: [...repositoryProviders, ...serviceProviders],
    exports: [

    ],
    imports: [PopulationModule]
})
export class GamesModule { }
