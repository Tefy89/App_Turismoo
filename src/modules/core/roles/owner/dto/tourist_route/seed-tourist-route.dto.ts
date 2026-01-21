import { PickType } from '@nestjs/swagger';
import { BaseTouristRouteDto } from './base-tourist-route.dto';

export class SeedTouristRouteDto extends PickType(BaseTouristRouteDto, [
  'userId',
  'name',
  'description',
  'duration',
  'creationDate',
]) {}
