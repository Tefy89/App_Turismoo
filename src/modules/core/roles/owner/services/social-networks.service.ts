import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SocialNetworkEntity } from '@modules/core/entities';
import { CreateSocialNetworkDto, UpdateSocialNetworkDto } from '../dto/social-network';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class SocialNetworksService {
  private paginateFilterService: PaginateFilterService<SocialNetworkEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.SOCIAL_NETWORK_REPOSITORY)
    private repository: Repository<SocialNetworkEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(
    payload: CreateSocialNetworkDto,
  ): Promise<SocialNetworkEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['urlRedSocial'],
      relations: ['place', 'platform'],
    });
  }

  async findOne(id: string): Promise<SocialNetworkEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['place', 'platform'],
    });

    if (!entity) {
      throw new NotFoundException('Red social no encontrada');
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdateSocialNetworkDto,
  ): Promise<SocialNetworkEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Red social no encontrada para actualizar',
      );
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<SocialNetworkEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Red social no encontrada para eliminar',
      );
    }

    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
    };
  }
}
