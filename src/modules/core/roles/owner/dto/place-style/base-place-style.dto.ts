import { IsUUID } from 'class-validator';

export class BasePlaceStyleDto {
  @IsUUID('4')
  readonly placeId: string;

  @IsUUID('4')
  readonly styleId: string;
}


