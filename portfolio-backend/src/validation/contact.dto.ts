import {
  IsEmail, IsNotEmpty, IsString, MaxLength, IsIn
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @IsEmail({}, { message: 'Valid email is required' })
  email: string;

  @IsString()
  @IsIn([
    'Full-Time Backend Role',
    'Full Stack Engineering Role',
    'Distributed Systems Project',
    'Technical Consultation',
    'General Inquiry',
  ])
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MaxLength(2000)
  message: string;
}
