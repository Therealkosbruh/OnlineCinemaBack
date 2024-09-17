
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionType, User, Studio, Show, Content } from "./database.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionType, User, Studio, Show, Content])]
})
export class DatabaseModule {}