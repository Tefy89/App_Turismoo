import { PickType } from '@nestjs/swagger';
import { BaseShiftDto } from './base-shift.dto';

export class SeedShiftDto extends PickType(BaseShiftDto, [
  'fromHour',
  'fromMinute',
  'toHour',
  'toMinute',
  'status',
]) {}
