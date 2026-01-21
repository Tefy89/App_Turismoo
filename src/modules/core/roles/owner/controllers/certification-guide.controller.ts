import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CertificationGuidesService } from '../services/certification-guide.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';
import { CreateCertificationGuideDto } from '../dto/certification_guide/create-certification-guide.dto';
import { UpdateCertificationGuideDto } from '../dto/certification_guide/update-certification-guide.dto';

@ApiTags('Certification Guides')
@Controller('core/owner/certification-guides')
export class CertificationGuidesController {
  constructor(private readonly service: CertificationGuidesService) {}

  @ApiOperation({ summary: 'Create Certification Guide' })
  @Post()
  async create(@Body() payload: CreateCertificationGuideDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Certificación creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All Certification Guides' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Certificaciones listadas',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One Certification Guide' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return {
      data: serviceResponse,
      message: 'Certificación encontrada',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update Certification Guide' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCertificationGuideDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return {
      data: serviceResponse,
      message: 'Certificación actualizada',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Remove Certification Guide' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return {
      data: serviceResponse,
      message: 'Certificación eliminada',
      title: 'Eliminado',
    };
  }
}
