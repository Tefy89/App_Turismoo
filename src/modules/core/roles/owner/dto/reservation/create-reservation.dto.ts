import { PickType } from '@nestjs/swagger';
import { BaseReservationDto } from './base-reservation.dto';

export class CreateReservationDto extends PickType(BaseReservationDto, [
  'touristRouteId',
  'guideId',
  'statusId',
  'date',
  'time',
  'totalCost',
]) {}
