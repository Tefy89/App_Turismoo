import { PickType } from '@nestjs/swagger';
import { BaseCertificationGuideDto } from './base-certification-guide.dto';

export class CreateCertificationGuideDto extends PickType(BaseCertificationGuideDto, [
  'certificationTypeId',
  'name',
  'institution',
  'issueDate',
  'expirationDate',
  'description',
]) {}
