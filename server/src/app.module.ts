import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DonateModule } from 'donate/donate.module';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/donate';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${MONGO_URI}`),
    DonateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
