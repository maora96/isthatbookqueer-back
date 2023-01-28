import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/book.entity';
import { BookModule } from './book/book.module';
import { Character } from './book/character.entity';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'aroacedb',
      entities: [Book, Character],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
