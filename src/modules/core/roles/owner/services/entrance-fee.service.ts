import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntranceFeeEntity } from '@modules/core/entities/entrance-fee.entity';
import {
  CreateEntranceFeeDto,
  UpdateEntranceFeeDto,
} from '../dto/entrance-fee';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class EntranceFeesService {
  private paginateFilterService: PaginateFilterService<EntranceFeeEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.ENTRANCE_FEE_REPOSITORY)
    private repository: Repository<EntranceFeeEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(
    payload: CreateEntranceFeeDto,
  ): Promise<EntranceFeeEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['currency'],
      relations: ['place'],
    });
  }

  async findOne(id: string): Promise<EntranceFeeEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['place'],
    });

    if (!entity) {
      throw new NotFoundException('Tarifa de entrada no encontrada');
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdateEntranceFeeDto,
  ): Promise<EntranceFeeEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Tarifa de entrada no encontrada para actualizar',
      );
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async delete(id: string): Promise<EntranceFeeEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Tarifa de entrada no encontrada para eliminar',
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
