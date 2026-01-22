import { Controller, Get, Post, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlaceStylesService } from '../services/place-style.service';
import { CreatePlaceStyleDto } from '../dto/place-style';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Place Styles')
@Controller('core/owner/place-styles')
export class PlaceStylesController {
  constructor(private readonly service: PlaceStylesService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(
    @Body() payload: CreatePlaceStyleDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Estilo agregado al lugar',
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
      message: 'Estilos listados',
      title: 'Success',
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
      message: 'Estilo eliminado del lugar',
      title: 'Eliminado',
    };
  }
}
