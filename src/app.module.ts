import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from './entities/database.module'
import { ShowModule } from './modules/show.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DatabaseModule,
    ShowModule, 
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}