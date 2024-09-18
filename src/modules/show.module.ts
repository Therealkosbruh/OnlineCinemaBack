import { Module } from '@nestjs/common';
import { ShowController } from '../controllers/show.controller';
import { ShowService } from '../services/show.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from '../entities/database.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}