import { IsUUID } from 'class-validator';


export class BaseTourGuideLanguageDto {
  @IsUUID()
  readonly tourGuideId: string;

  @IsUUID()
  readonly languageId: string;
}
