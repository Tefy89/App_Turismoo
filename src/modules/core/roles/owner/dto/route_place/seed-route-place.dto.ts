import { PickType } from '@nestjs/swagger';
import { BaseRoutePlaceDto } from './base-route-place.dto';

export class SeedRoutePlaceDto extends PickType(BaseRoutePlaceDto, [
  'touristRouteId',
  'placeId',
  'visitOrder',
]) {}
