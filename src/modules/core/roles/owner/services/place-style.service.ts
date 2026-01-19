import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlaceStyleEntity } from '@modules/core/entities/place-style.entity';
import {
  CreatePlaceStyleDto,
} from '../dto/place-style';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class PlaceStylesService {
  private paginateFilterService: PaginateFilterService<PlaceStyleEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.PLACE_STYLE_REPOSITORY)
    private repository: Repository<PlaceStyleEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(
    payload: CreatePlaceStyleDto,
  ): Promise<PlaceStyleEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      relations: ['place', 'style'],
    });
  }

  async remove(id: string): Promise<PlaceStyleEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Estilo del lugar no encontrado para eliminar',
      );
    }

    return await this.repository.softRemove(entity);
  }
}
