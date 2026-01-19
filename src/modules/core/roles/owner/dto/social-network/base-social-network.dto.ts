import { IsString, MaxLength } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class BaseSocialNetworkDto {
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly placeId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly platformId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(500, maxLengthValidationOptions())
  readonly urlRedSocial: string;
}
