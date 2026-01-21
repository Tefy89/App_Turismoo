import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';
import { RoutePlaceEntity } from '@modules/core/entities/route_place.entity';
import { CreateRoutePlaceDto } from '../dto/route_place/create-route-place.dto';
import { UpdateRoutePlaceDto } from '../dto/route_place/update-route-place.dto';

@Injectable()
export class RoutePlaceService {
  private paginateFilterService: PaginateFilterService<RoutePlaceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.ROUTE_PLACE_REPOSITORY)
    private repository: Repository<RoutePlaceEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateRoutePlaceDto): Promise<RoutePlaceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      relations: ['touristRoute', 'place'],
    });
  }

  async findOne(id: string): Promise<RoutePlaceEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['touristRoute', 'place'],
    });

    if (!entity) {
      throw new NotFoundException('Route place not found');
    }

    return entity;
  }

  async update(id: string, payload: UpdateRoutePlaceDto): Promise<RoutePlaceEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Route place not found');
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<RoutePlaceEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Route place not found');
    }

    return await this.repository.softRemove(entity);
  }
}
