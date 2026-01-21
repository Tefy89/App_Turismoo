import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';
import { ReservationEntity } from '@modules/core/entities/reservation.entity';
import { CreateReservationDto } from '../dto/reservation/create-reservation.dto';
import { UpdateReservationDto } from '../dto/reservation/update-reservation.dto';

@Injectable()
export class ReservationsService {
  private paginateFilterService: PaginateFilterService<ReservationEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.RESERVATION_REPOSITORY)
    private repository: Repository<ReservationEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateReservationDto): Promise<ReservationEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      relations: ['touristRoute', 'guide', 'status'],
    });
  }

  async findOne(id: string): Promise<ReservationEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['touristRoute', 'guide', 'status'],
    });

    if (!entity) {
      throw new NotFoundException('Reservation not found');
    }

    return entity;
  }

  async update(id: string, payload: UpdateReservationDto): Promise<ReservationEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Reservation not found');
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<ReservationEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Reservation not found');
    }

    return await this.repository.softRemove(entity);
  }
}
