import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TourGuideLanguageEntity } from '@modules/core/entities/tour-guide-languaje.entity';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';
import { CreateTourGuideLanguageDto } from '../dto/tour-guide-languaje/create-tour-guide-languaje.dto';

@Injectable()
export class TourGuideLanguagesService {
  private paginateFilterService: PaginateFilterService<TourGuideLanguageEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.TOUR_GUIDE_LANGUAGE_REPOSITORY)
    private repository: Repository<TourGuideLanguageEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(
    payload: CreateTourGuideLanguageDto,
  ): Promise<TourGuideLanguageEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(
    params: PaginationDto,
  ): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      relations: ['tourGuide', 'language'],
    });
  }

  async delete(id: string): Promise<TourGuideLanguageEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(
        'Idioma del guía no encontrado para eliminar',
      );
    }

    return await this.repository.softRemove(entity);
  }
}
