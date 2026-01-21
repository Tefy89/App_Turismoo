import { Controller, Get, Post, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TourGuideLanguagesService } from '../services/tour-guide-languaje.service';
import { CreateTourGuideLanguageDto } from '../dto/tour-guide-languaje/create-tour-guide-languaje.dto';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';


@ApiTags('Tour Guide Languages')
@Controller('core/owner/tour-guide-languages')
export class TourGuideLanguagesController {
  constructor(private readonly service: TourGuideLanguagesService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(
    @Body() payload: CreateTourGuideLanguageDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Idioma asignado al guía',
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
      message: 'Idiomas del guía listados',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return {
      data: serviceResponse,
      message: 'Idioma eliminado del guía',
      title: 'Eliminado',
    };
  }
}
