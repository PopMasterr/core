import { ApiProperty } from "@nestjs/swagger";
import { GameDto } from "./create-classic-game-response.dto";

export class GetStreakGameCoordinatesResponseDto {
    @ApiProperty({ type: GameDto })
    gameBlueCoord: GameDto;

    @ApiProperty({ type: GameDto })
    gameRedCoord: GameDto;
}
