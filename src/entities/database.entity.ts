// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

// @Entity('SubscriptionTypes')
// export class SubscriptionEntity{
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string;

//     @Column('text')
//     description: string;

//     @Column()
//     paymentprice: number
// }

@Entity()
export class SubscriptionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => SubscriptionType, (subscriptionType) => subscriptionType.id)
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionType;

  @Column()
  paymentDate: Date;
}

@Entity()
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imdbRating: number;

  @Column()
  description: string;

  @Column()
  posterUrl: string;

  @Column()
  type: string;

  @ManyToOne(() => SubscriptionType, (subscriptionType) => subscriptionType.id)
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionType;

  @ManyToOne(() => Studio, (studio) => studio.id)
  @JoinColumn({ name: 'studio_id' })
  studio: Studio;

  @Column()
  releaseYear: number;

  @Column()
  endYear: number;
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Show, (show) => show.id)
  @JoinColumn({ name: 'show_id' })
  show: Show;

  @Column()
  seasonNumber: number;

  @Column()
  episodeNumber: number;

  @Column()
  contentUrl: string;
}