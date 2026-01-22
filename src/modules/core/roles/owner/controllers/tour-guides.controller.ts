import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TourGuidesService } from '../services/tour-guide.service';
import { CreateTourGuideDto, UpdateTourGuideDto } from '../dto/tour-guide';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';


@ApiTags('Tour Guides')
@Controller('core/owner/tour-guides')
export class TourGuidesController {
  constructor(private readonly service: TourGuidesService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(
    @Body() payload: CreateTourGuideDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Guía turístico creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(
    @Query() params: PaginationDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Guías listados',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return {
      data: serviceResponse,
      message: 'Guía encontrado',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTourGuideDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return {
      data: serviceResponse,
      message: 'Guía actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete One' })
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.delete(id);
    return {
      data: serviceResponse,
      message: 'Guía eliminado',
      title: 'Eliminado',
    };
  }
}
