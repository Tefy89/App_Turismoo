import { PickType } from '@nestjs/swagger';
import { BaseShiftDto } from './base-shift.dto';

export class UpdateShiftDto extends PickType(BaseShiftDto, [
  'fromHour',
  'fromMinute',
  'toHour',
  'toMinute',
  'status',
]) {}
