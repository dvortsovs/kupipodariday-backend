import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async findAll() {
    const wishes = await this.wishRepository.find();
    return wishes;
  }

  async createWish(wishDto: CreateWishDto) {
    const wish = await this.wishRepository.save(wishDto);
    return wish;
  }
}
