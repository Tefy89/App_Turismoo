import { IsUUID, IsDateString, IsNumber, IsString } from 'class-validator';
import {
  isUrlValidationOptions,
  isDateValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';

export class BaseReservationDto {
  @IsUUID('4', isUrlValidationOptions())
  readonly touristRouteId: string;

  @IsUUID('4', isUrlValidationOptions())
  readonly guideId: string;

  @IsUUID('4', isUrlValidationOptions())
  readonly statusId: string;

  @IsDateString({}, isDateValidationOptions())
  readonly date: Date;

  @IsString(isStringValidationOptions())
  readonly time: string;

  @IsNumber({}, isNumberValidationOptions())
  readonly totalCost: number;
}
