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

import { PlacesService } from '../services/place.service';
import { CreatePlaceDto, UpdatePlaceDto } from '../dto/place';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Places')
@Controller('core/owner/places')
export class PlacesController {
  constructor(private readonly service: PlacesService) {}

  @ApiOperation({ summary: 'Create Place' })
  @Post()
  async create(
    @Body() payload: CreatePlaceDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Lugar creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All Places' })
  @Get()
  async findAll(
    @Query() params: PaginationDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Lugares listados',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One Place' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return {
      data: serviceResponse,
      message: 'Lugar encontrado',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update Place' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePlaceDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return {
      data: serviceResponse,
      message: 'Lugar actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Remove Place' })
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return {
      data: serviceResponse,
      message: 'Lugar eliminado',
      title: 'Eliminado',
    };
  }

  @ApiOperation({ summary: 'Catalogue Places' })
  @Get('catalogue')
  async catalogue(): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.catalogue();
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Catalogue',
      title: 'Catalogue',
    };
  }
}
