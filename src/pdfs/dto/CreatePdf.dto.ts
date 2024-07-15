import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePdfDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  size: string;
  
  @IsNotEmpty()
  @IsString()
  link: string;
}

