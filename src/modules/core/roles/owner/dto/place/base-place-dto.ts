import { IsString, IsNumber, MaxLength } from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';

export class BasePlaceDto {
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly placeCategoryId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly religiousOrderId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly address: string;

  @IsNumber({}, isNumberValidationOptions())
  readonly latitude: number;

  @IsNumber({}, isNumberValidationOptions())
  readonly longitude: number;

  @IsNumber({}, isNumberValidationOptions())
  readonly area: number;

  @IsString(isStringValidationOptions())
  readonly relevantData: string;
}
