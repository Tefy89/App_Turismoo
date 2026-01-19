import { PickType } from '@nestjs/swagger';
import { BaseTourGuideDto } from './base-tour-guide.dto';

export class SeedTourGuideDto extends PickType(BaseTourGuideDto, [
  'userId',
  'available',
  'hourlyRate',
]) {}
