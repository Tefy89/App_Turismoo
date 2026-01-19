import { PickType } from '@nestjs/swagger';
import { BaseTourGuideLanguageDto } from './base-tour-guide-languaje.dto';

export class SeedTourGuideLanguageDto extends PickType(
  BaseTourGuideLanguageDto,
  ['tourGuideId', 'languageId'],
) {}
