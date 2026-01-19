import { PickType } from '@nestjs/swagger';
import { BaseTourGuideDto } from './base-tour-guide.dto';

export class UpdateTourGuideDto extends PickType(BaseTourGuideDto, [
  'userId',
  'available',
  'hourlyRate',
]) {}
