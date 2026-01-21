import { PickType } from '@nestjs/swagger';
import { BaseEntranceFeeDto } from './base-entrance-fee.dto';

export class CreateEntranceFeeDto extends PickType(BaseEntranceFeeDto, [
  'placeId',
  'price',
  'currency',
]) {}
