import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async findLast() {
    return await this.wishRepository.find({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }

  async findAll() {
    return await this.wishRepository.find();
  }

  async findUserWishes(id: number) {
    return await this.wishRepository.find({
      where: { owner: { id } },
    });
  }

  async create(owner: User, wishDto: CreateWishDto) {
    return await this.wishRepository.save({
      ...wishDto,
      owner,
    });
  }
}
