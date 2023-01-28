import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EditCharacterDTO } from './dtos/edit-book.dto';

export enum SexualOrientation {
  'ASEXUAL',
  'GRAYASEXUAL',
  'DEMISEXUAL',
  'BISEXUAL',
  'GAY',
  'PANSEXUAL',
  'HETEROSEXUAL',
  'QUEER',
  'ALLOSEXUAL',
  'ACESPEC',
}

export enum RomanticOrientation {
  'AROMANTIC',
  'GRAYROMANTIC',
  'DEMIROMANTIC',
  'BIROMANTIC',
  'HOMOROMANTIC',
  'PANROMANTIC',
  'HETEROROMANTIC',
  'AROFLUX',
  'ALLOROMANTIC',
  'AROSPEC',
}

export enum Gender {
  'MALE',
  'FEMALE',
  'NONBINARY',
}

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  sexualOrientation: SexualOrientation;

  @Column({ type: 'text' })
  romanticOrientation: RomanticOrientation;

  @Column({ type: 'text' })
  gender: Gender;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  constructor(
    name: string,
    sexualOrientation: SexualOrientation,
    romanticOrientation: RomanticOrientation,
    gender: Gender,
    id?: string,
    createdAt?: Date | null,
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.sexualOrientation = sexualOrientation;
    this.romanticOrientation = romanticOrientation ?? null;
    this.gender = gender;
    this.createdAt = createdAt ?? new Date();
  }

  edit(edittedCharacter: EditCharacterDTO) {
    this.name = edittedCharacter.name ?? this.name;
    this.romanticOrientation =
      edittedCharacter.romanticOrientation ?? this.romanticOrientation;
    this.sexualOrientation =
      edittedCharacter.sexualOrientation ?? this.sexualOrientation;
    this.gender = edittedCharacter.gender ?? this.gender;
  }
}
