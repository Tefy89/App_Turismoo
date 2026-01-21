import { PickType } from '@nestjs/swagger';
import { BasePlaceStyleDto } from './base-place-style.dto';

export class UpdatePlaceStyleDto extends PickType(BasePlaceStyleDto, [
  'placeId',
  'styleId',
]) {}
