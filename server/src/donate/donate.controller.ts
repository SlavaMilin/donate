import { DonateService } from './donate.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateDonateDto } from './dto/create-donate.dto';

@Controller('donate')
export class DonateController {
  constructor(private donateService: DonateService) {}
  @Post()
  create(@Body() createDonateDto: CreateDonateDto) {
    this.donateService.create(createDonateDto);
  }
}
