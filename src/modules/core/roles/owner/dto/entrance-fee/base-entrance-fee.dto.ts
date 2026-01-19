import { IsString, IsNumber, IsUUID, MaxLength } from 'class-validator';
import {
  isStringValidationOptions,
  isNumberValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';

export class BaseEntranceFeeDto {
  @IsUUID('4', isStringValidationOptions())
  readonly placeId: string;

  @IsNumber({}, isNumberValidationOptions())
  readonly price: number;

  @IsString(isStringValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly currency: string;
}
