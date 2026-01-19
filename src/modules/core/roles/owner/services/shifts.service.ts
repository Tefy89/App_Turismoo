import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShiftEntity } from '@modules/core/entities';
import { CreateShiftDto, UpdateShiftDto } from '../dto/shift';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class ShiftsService {
  private paginateFilterService: PaginateFilterService<ShiftEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.SHIFT_REPOSITORY)
    private repository: Repository<ShiftEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateShiftDto): Promise<ShiftEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['fromHour', 'toHour'],
      relations: ['schedules'],
    });
  }

  async findOne(id: string): Promise<ShiftEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!entity) {
      throw new NotFoundException('Turno no encontrado');
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdateShiftDto,
  ): Promise<ShiftEntity> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(
        'Turno no encontrado para actualizar',
      );
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<ShiftEntity> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(
        'Turno no encontrado para eliminar',
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
