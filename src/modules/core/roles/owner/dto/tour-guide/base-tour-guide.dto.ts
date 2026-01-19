import { IsUUID, IsBoolean, IsNumber } from 'class-validator';
import {
  isBooleanValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';

export class BaseTourGuideDto {
  @IsUUID()
  readonly userId: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly available: boolean;

  @IsNumber({}, isNumberValidationOptions())
  readonly hourlyRate: number;
}

