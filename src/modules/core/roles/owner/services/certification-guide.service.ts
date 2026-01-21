import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';
import { CertificationGuideEntity } from '@modules/core/entities/certification_guide.entity';
import { CreateCertificationGuideDto } from '../dto/certification_guide/create-certification-guide.dto';
import { UpdateCertificationGuideDto } from '../dto/certification_guide/update-certification-guide.dto';

@Injectable()
export class CertificationGuidesService {
  private paginateFilterService: PaginateFilterService<CertificationGuideEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.CERTIFICATION_GUIDE_REPOSITORY)
    private repository: Repository<CertificationGuideEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateCertificationGuideDto): Promise<CertificationGuideEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      relations: ['certificationType'],
    });
  }

  async findOne(id: string): Promise<CertificationGuideEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['certificationType'],
    });

    if (!entity) {
      throw new NotFoundException('Certificación no encontrada');
    }

    return entity;
  }

  async update(
    id: string,
    payload: UpdateCertificationGuideDto,
  ): Promise<CertificationGuideEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Certificación no encontrada para actualizar');
    }

    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<CertificationGuideEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Certificación no encontrada para eliminar');
    }

    return await this.repository.softRemove(entity);
  }
}
