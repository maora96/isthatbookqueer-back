import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay } from 'date-fns';
import { knex } from 'src/db/knex';
import { getLimitAndOffset } from 'src/utils/pagination';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Character } from './character.entity';
import { CreateBookDTO, CreateCharacterDTO } from './dtos/create-book.dto';
import { EditBookDTO } from './dtos/edit-book.dto';
import { FiltersParams } from './dtos/get-books.dto';

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

  async editApproval(id: string) {
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.approved = !book.approved;
    return this.booksRepository.save(book);
  }

  async findOne(id: string) {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['characters'],
    });
  }

  async delete(id: string) {
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return this.booksRepository.remove(book);
  }

  async findMany(filters: FiltersParams) {
    const query = knex('books').select('*');
    const totalQuery = knex('books').count();
    const { limit, offset } = getLimitAndOffset(filters.amount, filters.page);

    query.limit(limit).offset(offset);
    totalQuery.limit(limit).offset(offset);

    if (filters?.since) {
      query.andWhere('createdAt', '>=', filters.since);

      totalQuery.andWhere('createdAt', '>=', filters.since);
    }

    if (filters?.until) {
      query.andWhere(
        'createdAt',
        '<=',
        endOfDay(new Date(filters.until)).toDateString(),
      );

      totalQuery.andWhere(
        'createdAt',
        '<=',
        endOfDay(new Date(filters.until)).toDateString(),
      );
    }

    if (filters?.search) {
      query
        .whereILike('title', `%${filters.search}%`)
        .orWhereILike('author', `%${filters.search}%`)
        .orWhereILike('series', `%${filters.search}%`);
      totalQuery
        .whereILike('title', `%${filters.search}%`)
        .orWhereILike('author', `%${filters.search}%`)
        .orWhereILike('series', `%${filters.search}%`);
    }

    if (filters?.genre) {
      query.whereRaw('? =ANY(genres)', filters.genre);
    }

    const result = await query;
    const [total] = await totalQuery;

    return { result, total: total?.count ? Number(total?.count) : 0 };
  }

  async findRandom() {
    const query = knex('books')
      .select('*')
      .orderByRaw('RANDOM()')
      .where('approved', true);

    const result = await query;

    return result;
  }

  async getFavorites() {}
}
