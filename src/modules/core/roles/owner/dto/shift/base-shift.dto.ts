import { IsNumber, IsBoolean } from 'class-validator';
import { isNumberValidationOptions, isBooleanValidationOptions } from '@utils/dto-validation';

export class BaseShiftDto {
  @IsNumber({}, isNumberValidationOptions())
  readonly fromHour: number;

  @IsNumber({}, isNumberValidationOptions())
  readonly fromMinute: number;

  @IsNumber({}, isNumberValidationOptions())
  readonly toHour: number;

  @IsNumber({}, isNumberValidationOptions())
  readonly toMinute: number;

  @IsBoolean(isBooleanValidationOptions())
  readonly status: boolean;
}
