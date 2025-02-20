import { ApiProperty } from "@nestjs/swagger";
import { GameDto } from "./create-classic-game-response.dto";

export class GetMultiplayerGameCoordinatesResponseDto {
    @ApiProperty({ type: GameDto })
    gameCoordinates: GameDto[];
}
