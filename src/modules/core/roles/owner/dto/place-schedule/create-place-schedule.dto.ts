import { PickType } from '@nestjs/swagger';
import { BasePlaceScheduleDto } from './base-place-schedule.dto';

export class CreatePlaceScheduleDto extends PickType(BasePlaceScheduleDto, [
  'placeId',
  'shiftId',
  'day',
]) {}
