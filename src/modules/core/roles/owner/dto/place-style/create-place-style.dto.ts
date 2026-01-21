import { PickType } from '@nestjs/swagger';
import { BasePlaceStyleDto } from './base-place-style.dto';

export class CreatePlaceStyleDto extends PickType(BasePlaceStyleDto, [
  'placeId',
  'styleId',
]) {}
