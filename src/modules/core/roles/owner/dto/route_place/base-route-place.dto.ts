import { IsUUID, IsNumber } from 'class-validator';
import { isUrlValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';

export class BaseRoutePlaceDto {
  @IsUUID('4', isUrlValidationOptions())
  readonly touristRouteId: string;

  @IsUUID('4', isUrlValidationOptions())
  readonly placeId: string;

  @IsNumber({}, isNumberValidationOptions())
  readonly visitOrder: number;
}
