import { PickType } from '@nestjs/swagger';
import { BaseTourGuideLanguageDto } from './base-tour-guide-languaje.dto';  

export class UpdateTourGuideLanguageDto extends PickType(
  BaseTourGuideLanguageDto,
  ['tourGuideId', 'languageId'],
) {}
