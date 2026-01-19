import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TourGuideEntity } from '@modules/core/entities/tour-guide.entity';
import {
  CreateTourGuideDto,
  UpdateTourGuideDto,
} from '../dto/tour-guide';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class TourGuidesService {
  private paginateFilterService: PaginateFilterService<TourGuideEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.TOUR_GUIDE_REPOSITORY)
    private repository: Repository<TourGuideEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(
    payload: CreateTourGuideDto,
  ): Promise<TourGuideEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      relations: ['user', 'languages'],
    });
  }

  async findOne(id: string): Promise<TourGuideEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user', 'languages', 'languages.language'],
    });

    if (!entity) {
      throw new NotFoundException('Guía turístico no encontrado');
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdateTourGuideDto,
  ): Promise<TourGuideEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Guía turístico no encontrado para actualizar',
      );
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<TourGuideEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Guía turístico no encontrado para eliminar',
      );
    }

    return await this.repository.softRemove(entity);
  }
}
