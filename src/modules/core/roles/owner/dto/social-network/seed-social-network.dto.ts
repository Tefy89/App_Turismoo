import { PickType } from '@nestjs/swagger';
import { BaseSocialNetworkDto } from './base-social-network.dto';

export class SeedSocialNetworkDto extends PickType(BaseSocialNetworkDto, [
  'placeId',
  'platformId',
  'urlRedSocial',
]) {}
