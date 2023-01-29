import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Character } from './character.entity';
import { EditCharacterDTO } from './dtos/edit-book.dto';

export enum Genres {
  'FANTASY',
  'SCIENCE_FICTION',
  'ROMANCE',
  'HISTORICAL FICTION',
  'CONTEMPORARY',
  'URBAN FANTASY',
  'POST_APOCALYPTIC',
  'SOLARPUNK',
  'HIGH_FANTASY',
  'EPIC_FANTASY',
  'HISTORICAL FANTASY',
  'DARK_FANTASY',
  'GRIMDARK',
  'RETELLING',
  'MYSTERY',
  'THRILLER',
  'PARANORMAL',
  'SUPERHERO',
  'HORROR',
}

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  author: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  series: string | null;

  @Column('text', { array: true, nullable: true })
  genres: Genres[];

  @Column({ type: 'text' })
  cover: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: Boolean })
  is_queer: boolean;

  @ManyToMany(() => Character, { cascade: true })
  @JoinColumn()
  @JoinTable()
  characters: Character[] | null;

  @Column({ type: Boolean, default: false })
  approved: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  constructor(
    title: string,
    author: string,
    series: string | null,
    genres: Genres[],
    cover: string,
    description: string,
    is_queer: boolean,
    approved: boolean,
    characters: Character[],
    id?: string,
    createdAt?: Date | null,
  ) {
    this.id = id ?? uuid();
    this.title = title;
    this.author = author;
    this.series = series ?? null;
    this.genres = genres;
    this.cover = cover;
    this.description = description;
    this.is_queer = is_queer;
    this.characters = characters;
    this.approved = approved;
    this.createdAt = createdAt ?? new Date();
  }

  editCharacters(characters: EditCharacterDTO[]) {
    this.characters.forEach((character: Character) => {
      characters.forEach((edittedCharacter: EditCharacterDTO) => {
        if (character.id === edittedCharacter.id) {
          character.edit(edittedCharacter);
        }
      });
    });
  }
}
