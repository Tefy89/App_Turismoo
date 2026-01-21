import { PickType } from '@nestjs/swagger';
import { BaseEntranceFeeDto } from './base-entrance-fee.dto';

export class UpdateEntranceFeeDto extends PickType(BaseEntranceFeeDto, [
  'placeId',
  'price',
  'currency',
]) {}

