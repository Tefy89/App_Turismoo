import { PickType } from '@nestjs/swagger';
import { BaseShiftDto } from './base-shift.dto';

export class CreateShiftDto extends PickType(BaseShiftDto, [
  'fromHour',
  'fromMinute',
  'toHour',
  'toMinute',
  'status',
]) {}
