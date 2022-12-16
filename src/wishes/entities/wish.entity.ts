import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Essence } from '../../entities/essence.entity';

@Entity()
export class Wish extends Essence {
  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  copied: number;

  @Column({ default: 0 })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
