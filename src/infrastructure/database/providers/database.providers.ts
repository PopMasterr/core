import { Provider } from "@nestjs/common";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { UserMetrics } from "src/users/entities/user-metrics.entity";
import { Achievement } from "src/achievements/entities/achievement.entity";
import { Game } from "src/games/entities/game.entity";
import { ClassicGame } from "src/games/entities/classic-game.entity";
import { ClassicGamesGame } from "src/games/entities/classic-games-game.entity";
import { StreakGamesGame } from "src/games/entities/streak-games-game.entity";
import { StreakGame } from "src/games/entities/streak-game.entity";
import { Image } from "src/images/entities/image.entity"
import { UserAchievement } from "src/users/entities/user-achievements.entity";
import { MultiplayerGame } from "src/games/entities/multiplayer-game.entity";
import { MultiplayerGamesGame } from "src/games/entities/multiplayer-games-game.entity";
import { MultiplayerGamesGamesScore } from "src/games/entities/multiplayer-games-games-score.entity";

export const databaseProviders: Array<Provider>  = [
    {
        provide: DatabaseDiTokens.MySQLDataSource,
        useFactory: () => {
            const dataSource: DataSource = new DataSource({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
                entities: [
                    User, 
                    UserMetrics, 
                    Achievement, 
                    Game, 
                    ClassicGame, 
                    StreakGame, 
                    ClassicGamesGame, 
                    StreakGamesGame, 
                    Image, 
                    UserAchievement,
                    MultiplayerGame,
                    MultiplayerGamesGame,
                    MultiplayerGamesGamesScore
                ],
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            });

            return dataSource.initialize();
        }
    }
]
