import { PickType } from '@nestjs/swagger';
import { BaseSocialNetworkDto } from './base-social-network.dto';

export class UpdateSocialNetworkDto extends PickType(BaseSocialNetworkDto, [
  'placeId',
  'platformId',
  'urlRedSocial',
]) {}
