import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../../guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get()
  getWishes() {
    return this.wishesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Post()
  createWish(@Body() wishDto: CreateWishDto, @Req() req) {
    const wish = { ...wishDto, user: req.user.id };
    return this.wishesService.createWish(wish);
  }
}
