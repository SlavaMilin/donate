import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonateController } from './donate.controller';
import { Donate, DonateSchema } from './donate.schema';
import { DonateService } from './donate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donate.name, schema: DonateSchema }]),
  ],
  controllers: [DonateController],
  providers: [DonateService],
})
export class DonateModule {}
