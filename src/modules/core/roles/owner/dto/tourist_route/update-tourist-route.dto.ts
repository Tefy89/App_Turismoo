import { PartialType } from '@nestjs/swagger';
import { BaseTouristRouteDto } from './base-tourist-route.dto';

export class UpdateTouristRouteDto extends PartialType(BaseTouristRouteDto) {}
