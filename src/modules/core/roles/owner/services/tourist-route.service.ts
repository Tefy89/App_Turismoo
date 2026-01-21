import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';
import { UpdateTouristRouteDto } from '../dto/tourist_route/update-tourist-route.dto';
import { TouristRouteEntity } from '@modules/core/entities/tourist_route.entity';
import { CreateTouristRouteDto } from '../dto/tourist_route/create-tourist-route.dto';

@Injectable()
export class TouristRoutesService {
  private paginateFilterService: PaginateFilterService<TouristRouteEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.TOURIST_ROUTE_REPOSITORY)
    private repository: Repository<TouristRouteEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateTouristRouteDto): Promise<TouristRouteEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['name', 'description'],
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<TouristRouteEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user', 'routePlaces'],
    });

    if (!entity) {
      throw new NotFoundException('Ruta turística no encontrada');
    }

    return entity;
  }

  async update(id: string, payload: UpdateTouristRouteDto): Promise<TouristRouteEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Ruta turística no encontrada');
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<TouristRouteEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Ruta turística no encontrada');
    }

    return await this.repository.softRemove(entity);
  }
}
