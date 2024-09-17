import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from './entities/database.module'


@Module({
  imports: [TypeOrmModule.forRoot(), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
