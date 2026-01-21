import { PickType } from '@nestjs/swagger';
import { BaseReservationDto } from './base-reservation.dto';

export class UpdateReservationDto extends PickType(BaseReservationDto, [
  'touristRouteId',
  'guideId',
  'statusId',
  'date',
  'time',
  'totalCost',
]) {}
