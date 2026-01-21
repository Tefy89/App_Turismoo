import { IsString, IsNumber, IsUUID, IsDateString } from 'class-validator';
import { isStringValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';

export class BaseTouristRouteDto {
  @IsUUID()
  readonly userId: string;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsNumber({}, isNumberValidationOptions())
  readonly duration: number;

  @IsDateString()
  readonly creationDate: Date;
}
