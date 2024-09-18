import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShowService } from '../services/show.service';
import { Show } from '../entities/database.entity';

@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async getAllShows(): Promise<Show[]> {
    return this.showService.getAllShows();
  }

  @Get(':studioId')
  async getShowsByStudioId(@Param('studioId') studioId: number): Promise<Show[]> {
    return this.showService.getShowsByStudioId(studioId);
  }

  @Get('id/:id')
  async getShowById(@Param('id') id: number): Promise<Show> {
    return this.showService.getShowById(id);
  }

  @Get('top-rated')
  async getTopRatedShows(): Promise<Show[]> {
    return this.showService.getTopRatedShows();
  }

  @Get('by-release-year/asc')
  async getMoviesByReleaseYearAsc(): Promise<Show[]> {
    return this.showService.getMoviesByReleaseYearAsc();
  }

  @Get('by-release-year/desc')
  async getMoviesByReleaseYearDesc(@Query('endYear') endYear?: number): Promise<Show[]> {
    return this.showService.getMoviesByReleaseYearDesc(endYear);
  }
}