import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../../guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post()
  createWish(@Body() wishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(req.user, wishDto);
  }

  @Get('/last')
  findLastWish() {
    return this.wishesService.findLast();
  }
}
