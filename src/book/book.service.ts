import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Character } from './character.entity';
import { CreateBookDTO, CreateCharacterDTO } from './dtos/create-book.dto';
import { EditBookDTO } from './dtos/edit-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  async create(bookDTO: CreateBookDTO) {
    const book = new Book(
      bookDTO.title,
      bookDTO.author,
      bookDTO.series,
      bookDTO.genres,
      bookDTO.cover,
      bookDTO.description,
      bookDTO.is_queer,
      bookDTO.approved,
      bookDTO.characters.map(
        (character: CreateCharacterDTO) =>
          new Character(
            character.name,
            character.sexualOrientation,
            character.romanticOrientation,
            character.gender,
          ),
      ),
    );

    return this.booksRepository.save(book);
  }

  async edit(id: string, editBookDTO: EditBookDTO) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['characters'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.title = editBookDTO.title ?? book.title;
    book.author = editBookDTO.author ?? book.author;
    book.series = editBookDTO.series ?? book.series;
    book.genres = editBookDTO.genres ?? book.genres;
    book.cover = editBookDTO.cover ?? book.cover;
    book.description = editBookDTO.description ?? book.description;
    book.is_queer = editBookDTO.is_queer ?? book.is_queer;
    book.approved = editBookDTO.approved ?? book.approved;

    book.editCharacters(editBookDTO.characters);

    return this.booksRepository.save(book);
  }

  async editApproval() {}

  async findOne(id: string) {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['characters'],
    });
  }

  async delete() {}

  async findMany() {}

  async findRandom() {}

  async getFavorites() {}
}
