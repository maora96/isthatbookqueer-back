import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMinSize,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Genres } from '../book.entity';
import {
  Gender,
  RomanticOrientation,
  SexualOrientation,
} from '../character.entity';
import { CreateCharacterDTO } from './create-book.dto';

export interface EditCharacterDTO {
  id: string;
  name: string;
  sexualOrientation: SexualOrientation;
  romanticOrientation: RomanticOrientation;
  gender: Gender;
}

export class EditBookDTO {
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Author must be a string.' })
  @IsOptional()
  author?: string;

  @IsString({ message: 'Series must be a string.' })
  @IsOptional()
  series?: string;

  @IsNotEmpty({ message: 'The field genres is necessary.' })
  @ArrayMinSize(1, {
    message: 'Genres must have at least one element.',
  })
  @IsOptional()
  genres?: Genres[];

  @IsString({ message: 'Cover must be a string.' })
  @IsOptional()
  cover?: string;

  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'Is_queer must be a boolean.' })
  @IsOptional()
  is_queer?: boolean;

  @IsArray({ message: 'characters must be an array' })
  @IsOptional()
  characters?: EditCharacterDTO[];

  @IsBoolean({ message: 'Approved must be a boolean.' })
  @IsOptional()
  approved?: boolean;
}
