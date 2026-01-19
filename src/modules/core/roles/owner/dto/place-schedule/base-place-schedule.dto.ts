import { IsString, MaxLength } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class BasePlaceScheduleDto {
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly placeId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly shiftId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly day: string;
}
