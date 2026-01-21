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

import { TouristRoutesService } from '../services/tourist-route.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';
import { CreateTouristRouteDto } from '../dto/tourist_route/create-tourist-route.dto';
import { UpdateTouristRouteDto } from '../dto/tourist_route/update-tourist-route.dto';

@ApiTags('Tourist Routes')
@Controller('core/owner/tourist-routes')
export class TouristRoutesController {
  constructor(private readonly service: TouristRoutesService) {}

  @ApiOperation({ summary: 'Create Tourist Route' })
  @Post()
  async create(@Body() payload: CreateTouristRouteDto): Promise<ResponseHttpInterface> {
    const data = await this.service.create(payload);
    return {
      data,
      message: 'Ruta turística creada',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All Tourist Routes' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const response = await this.service.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: 'Rutas turísticas listadas',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One Tourist Route' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const data = await this.service.findOne(id);
    return {
      data,
      message: 'Ruta turística encontrada',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update Tourist Route' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTouristRouteDto,
  ): Promise<ResponseHttpInterface> {
    const data = await this.service.update(id, payload);
    return {
      data,
      message: 'Ruta turística actualizada',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Remove Tourist Route' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const data = await this.service.remove(id);
    return {
      data,
      message: 'Ruta turística eliminada',
      title: 'Eliminado',
    };
  }
}
