import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common/decorators';
import { BookService } from './book.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { EditBookDTO } from './dtos/edit-book.dto';
import { FiltersParamsDTO, GetFavoritesDTO } from './dtos/get-books.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(@Body() body: CreateBookDTO) {
    return this.bookService.create(body);
    // return { message: 'hi', body };
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() body: EditBookDTO) {
    return this.bookService.edit(id, body);
  }

  @Patch('/approval/:id')
  async changeApprovalStatus(@Param('id') id: string) {
    return this.bookService.editApproval(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Get()
  async findMany(@Query() { ...filters }: FiltersParamsDTO) {
    return this.bookService.findMany(filters);
  }

  @Get('search/random')
  async findRandom() {
    return this.bookService.findRandom();
  }

  @Post('favorites')
  async getFavorites(@Body() body: GetFavoritesDTO) {
    const { favorites } = body;
    return await this.bookService.getFavorites(favorites);
  }
}
