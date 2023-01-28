import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common/decorators';
import { BookService } from './book.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { EditBookDTO } from './dtos/edit-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(@Body() body: CreateBookDTO) {
    return this.bookService.create(body);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() body: EditBookDTO) {
    return this.bookService.edit(id, body);
  }

  @Patch('/approval/:id')
  async changeApprovalStatus() {
    return this.bookService.editApproval();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  async delete() {
    return this.bookService.delete();
  }

  @Get()
  async findMany() {
    return this.bookService.findMany();
  }

  @Get('random')
  async findRandom() {
    return this.bookService.findRandom();
  }

  @Post('favorites')
  async getFavorites() {
    return this.bookService.getFavorites();
  }
}
