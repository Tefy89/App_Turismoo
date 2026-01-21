import { IsString, MaxLength, IsDateString } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class BaseCertificationGuideDto {
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly certificationTypeId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly institution: string;

  @IsDateString()
  readonly issueDate: string;

  @IsDateString()
  readonly expirationDate: string;

  @IsString(isStringValidationOptions())
  readonly description: string;
}
