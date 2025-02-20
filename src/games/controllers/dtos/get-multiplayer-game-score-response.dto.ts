import { ApiProperty } from "@nestjs/swagger";

class UsernameAndScore {
    @ApiProperty({ type: 'string' })
    username: string;
    
    @ApiProperty({ type: 'number' })
    score: number;
}

export class GetMultiplayerGameScoreResponseDto {
    @ApiProperty({ type: 'number' })
    currentGameScore: number;

    @ApiProperty({ type: UsernameAndScore, isArray: true })
    sumsOfScores: UsernameAndScore[];

    @ApiProperty({ type: 'number' })
    currentGamePopulation: number;
}
