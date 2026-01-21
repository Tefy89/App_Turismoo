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

import { ReservationsService } from '../services/reservation.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';
import { CreateReservationDto } from '../dto/reservation/create-reservation.dto';
import { UpdateReservationDto } from '../dto/reservation/update-reservation.dto';

@ApiTags('Reservations')
@Controller('core/owner/reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @ApiOperation({ summary: 'Create Reservation' })
  @Post()
  async create(@Body() payload: CreateReservationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return {
      data: serviceResponse,
      message: 'Reservation created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Find All Reservations' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Reservations listed',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One Reservation' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return {
      data: serviceResponse,
      message: 'Reservation found',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update Reservation' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateReservationDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return {
      data: serviceResponse,
      message: 'Reservation updated',
      title: 'Updated',
    };
  }

  @ApiOperation({ summary: 'Remove Reservation' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return {
      data: serviceResponse,
      message: 'Reservation removed',
      title: 'Removed',
    };
  }
}
