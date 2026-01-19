import { PickType } from '@nestjs/swagger';
import { BasePlaceStyleDto } from './base-place-style.dto';

export class SeedPlaceStyleDto extends PickType(BasePlaceStyleDto, [
  'placeId',
  'styleId',
]) {}
