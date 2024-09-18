// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Show } from '../entities/database.entity';

// @Injectable()
// export class ShowService {
//   constructor(
//     @InjectRepository(Show)
//     private readonly showRepository: Repository<Show>,
//   ) {}

//   async getAllShows(): Promise<Show[]> {
//     return this.showRepository.find();
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from '../entities/database.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async getAllShows(): Promise<Show[]> {
    return this.showRepository.find();
  }

  async getShowsByStudioId(studioId: number): Promise<Show[]> {
    return this.showRepository
      .createQueryBuilder('show')
      .where('show.studio.id = :studioId', { studioId })
      .getMany();
  }

  async getShowById(id: number): Promise<Show> {
    return this.showRepository.findOne(id);
  }

  async getTopRatedShows(): Promise<Show[]> {
    const maxRating = await this.showRepository
      .createQueryBuilder('show')
      .select('MAX(CAST(show.imdbRating AS decimal))', 'maxRating')
      .getRawOne();
  
    return this.showRepository
      .createQueryBuilder('show')
      .where('CAST(show.imdbRating AS decimal) = :maxRating', { maxRating })
      .getMany();
  }

  // async getMoviesByReleaseYearAsc(): Promise<Show[]> {
  //   return this.showRepository
  //     .createQueryBuilder('show')
  //     .orderBy('show.releaseYear', 'ASC')
  //     .getMany();
  // }
  
  // async getMoviesByReleaseYearDesc(): Promise<Show[]> {
  //   return this.showRepository
  //     .createQueryBuilder('show')
  //     .orderBy('show.releaseYear', 'DESC')
  //     .getMany();
  // }

  async getMoviesByReleaseYearAsc(): Promise<Show[]> {
    return this.showRepository
      .createQueryBuilder('show')
      .orderBy('show.releaseYear', 'ASC')
      .getMany();
  }
  
  async getMoviesByReleaseYearDesc(endYear?: number): Promise<Show[]> {
    const query = this.showRepository
      .createQueryBuilder('show')
      .orderBy('show.releaseYear', 'DESC');
  
    if (endYear) {
      query.andWhere('show.endYear <= :endYear', { endYear });
    }
  
    return query.getMany();
  }
}