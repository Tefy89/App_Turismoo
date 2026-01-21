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

import { RoutePlaceService } from '../services/route-place.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';
import { CreateRoutePlaceDto } from '../dto/route_place/create-route-place.dto';
import { UpdateRoutePlaceDto } from '../dto/route_place/update-route-place.dto';

@ApiTags('Route Places')
@Controller('core/owner/routes-places')
export class RoutePlaceController {
  constructor(private readonly service: RoutePlaceService) {}

  @ApiOperation({ summary: 'Create Route Place' })
  @Post()
  async create(@Body() payload: CreateRoutePlaceDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Route place created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Find All Route Places' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Route places listed',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One Route Place' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return {
      data: serviceResponse,
      message: 'Route place found',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update Route Place' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateRoutePlaceDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return {
      data: serviceResponse,
      message: 'Route place updated',
      title: 'Updated',
    };
  }

  @ApiOperation({ summary: 'Remove Route Place' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return {
      data: serviceResponse,
      message: 'Route place removed',
      title: 'Removed',
    };
  }
}
