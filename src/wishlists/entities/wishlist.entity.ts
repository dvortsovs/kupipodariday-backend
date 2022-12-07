import { Essence } from '../../entities/essence.entity';
import { Column, Entity } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist extends Essence {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ type: 'simple-array' })
  items: Wish[];
}
