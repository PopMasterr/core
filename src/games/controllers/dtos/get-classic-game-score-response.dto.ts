import { ApiProperty } from "@nestjs/swagger";

export class GetClassicGameScoreResponseDto {
    @ApiProperty({ type: 'number' })
    population: number;

    @ApiProperty({ type: 'number' })
    score: number;
};
