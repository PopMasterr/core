import { ApiProperty } from "@nestjs/swagger";

export class GetUserAchievementsResponseDto {
    @ApiProperty({ type: 'string' })
    achievementName: string;

    @ApiProperty({ type: 'string' })
    achievementDescription: string;
}
