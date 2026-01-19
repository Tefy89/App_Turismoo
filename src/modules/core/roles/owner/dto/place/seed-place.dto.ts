import { PickType } from '@nestjs/swagger';
import { BasePlaceDto } from './base-place-dto';

export class SeedPlaceDto extends PickType(BasePlaceDto, [
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
