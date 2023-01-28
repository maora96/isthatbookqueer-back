import {
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Genres } from '../book.entity';

export interface FiltersParams {
  amount: number;
  page: number;
  since?: Date | null;
  until?: Date | null;
  search?: string | null;
  genre?: Genres | null;
}

export class FiltersParamsDTO {
  @IsNumberString({}, { message: 'O campo page precisa ser um número' })
  @IsNotEmpty({ message: 'O campo page é necessário' })
  page!: number;

  @IsNumberString({}, { message: 'O campo amount precisa ser um número' })
  @IsNotEmpty({ message: 'O campo amount é necessário' })
  amount!: number;

  @IsDateString({}, { message: 'O campo since precisa ser do tipo Date' })
  @IsOptional()
  since!: Date;

  @IsDateString({}, { message: 'O campo until precisa ser do tipo Date' })
  @IsOptional()
  until!: Date;

  @IsString({ message: 'O campo search precisa ser em texto' })
  @IsOptional()
  search?: string;

  @IsString({ message: 'O campo search precisa ser em texto' })
  @IsOptional()
  genre?: Genres;
}

export class GetFavoritesDTO {
  @IsNotEmpty({ message: 'Favorites can not be empty' })
  @ArrayMinSize(1, {
    message: 'Favorites must have at least one element.',
  })
  favorites: string[];
}
