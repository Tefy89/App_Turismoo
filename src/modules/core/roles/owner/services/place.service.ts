import {
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { PlaceEntity } from '@modules/core/entities';
import { CreatePlaceDto, UpdatePlaceDto } from '../dto/place';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class PlacesService {
  private paginateFilterService: PaginateFilterService<PlaceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.PLACE_REPOSITORY)
    private repository: Repository<PlaceEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreatePlaceDto): Promise<PlaceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['name', 'description', 'address'],
      relations: ['placeCategory'],
    });
  }

  async findOne(id: string): Promise<PlaceEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: [
        'placeCategory',
        'religiousOrder',
        'socialNetworks',
        'schedules',
      ],
    });

    if (!entity) {
      throw new NotFoundException('Lugar no encontrado');
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdatePlaceDto,
  ): Promise<PlaceEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Lugar no encontrado para actualizar');
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<PlaceEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Lugar no encontrado para eliminar');
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
