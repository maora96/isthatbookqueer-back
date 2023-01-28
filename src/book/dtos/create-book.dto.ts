import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Genres } from '../book.entity';
import {
  Gender,
  RomanticOrientation,
  SexualOrientation,
} from '../character.entity';

export interface CreateCharacterDTO {
  name: string;
  sexualOrientation: SexualOrientation;
  romanticOrientation: RomanticOrientation;
  gender: Gender;
}

export class CreateBookDTO {
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsString({ message: 'Author must be a string.' })
  author: string;

  @IsString({ message: 'Series must be a string or null.' })
  series: string | null;

  @IsNotEmpty({ message: 'The field genres is necessary.' })
  @ArrayMinSize(1, {
    message: 'Genres must have at least one element.',
  })
  genres: Genres[];

  @IsString({ message: 'Cover must be a string.' })
  cover: string;

  @IsString({ message: 'Description must be a string.' })
  description: string;

  @IsBoolean({ message: 'is_queer must be a boolean.' })
  is_queer: boolean;

  @IsArray({ message: 'characters must be an array' })
  characters: CreateCharacterDTO[];

  @IsBoolean({ message: 'approved must be a boolean.' })
  approved: boolean;
}
