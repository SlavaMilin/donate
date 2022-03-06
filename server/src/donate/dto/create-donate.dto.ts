import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CURRENCIES_CODES } from 'constants/currencies-codes';

export class CreateDonateDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(CURRENCIES_CODES)
  currency: string;
}
