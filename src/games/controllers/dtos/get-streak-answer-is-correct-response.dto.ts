import { ApiProperty } from "@nestjs/swagger";

export class GetStreakAnswerIsCorrectResponseDto {

    @ApiProperty({ type: 'number' })
    isCorrect: Boolean;

    @ApiProperty({ type: 'number' })
    populationBlue: number;

    @ApiProperty({ type: 'number' })
    populationRed: number;

    @ApiProperty({ type: 'number' })
    streak: number;
}
