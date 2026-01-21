import { PickType } from '@nestjs/swagger';
import { BaseRoutePlaceDto } from './base-route-place.dto';

export class CreateRoutePlaceDto extends PickType(BaseRoutePlaceDto, [
  'touristRouteId',
  'placeId',
  'visitOrder',
]) {}
