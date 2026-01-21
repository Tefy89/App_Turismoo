import { PickType } from '@nestjs/swagger';
import { BaseReservationDto } from './base-reservation.dto';

export class SeedReservationDto extends PickType(BaseReservationDto, [
  'touristRouteId',
  'guideId',
  'statusId',
  'date',
  'time',
  'totalCost',
]) {}
