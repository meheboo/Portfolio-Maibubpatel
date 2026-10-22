import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class ChatMessageDto {
    @IsUUID()
    sessionId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    message: string;
}
