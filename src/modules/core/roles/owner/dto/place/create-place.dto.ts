import { PickType } from '@nestjs/swagger';
import { BasePlaceDto } from './base-place-dto';

export class CreatePlaceDto extends PickType(BasePlaceDto, [
  'placeCategoryId',
  'religiousOrderId',
  'name',
  'description',
  'address',
  'latitude',
  'longitude',
  'area',
  'relevantData',
]) {}
