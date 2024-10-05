import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/CreateEvent.dto';
import mongoose from 'mongoose';
import { UpdateEventDto } from './dto/UpdateEvent.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get('today')
  getEvent() {
    return this.eventsService.getTodayEvents();
  }

  @Get('id/:id')
  async getEventById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    const events = await this.eventsService.getEventById(id);
    if (!events)
      throw new HttpException(
        `Event not found with this id ${id}`,
        HttpStatus.NOT_FOUND,
      );

    return events;
  }

  @Get('date/:date')
  async getEventByDate(@Param('date') date: string) {
    const events = await this.eventsService.getEventByDate(date);
    if (!events)
      throw new HttpException(
        `Event not found with this date ${date}`,
        HttpStatus.NOT_FOUND,
      );
    return events;
  }

  @Get('month/:month/year/:year')
  async fetchEventsForMonth(
    @Param('month') month: string,
    @Param('year') year: string,
  ) {
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(monthNum) || isNaN(yearNum)) {
      throw new HttpException('Invalid month or year', HttpStatus.BAD_REQUEST);
    }

    const events = await this.eventsService.fetchEventsForMonth(monthNum, yearNum);
    if (!events || events.length === 0)
      throw new HttpException(
        `No events found for month ${month} and year ${year}`,
        HttpStatus.NOT_FOUND,
      );

    return events;
  }

  @Get('upcoming')
  async getUpcomingEvents() {
    return await this.eventsService.getUpcomingEvents();
  }

    @Get('all')
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body('UpdateEventDto') updateEventDto: UpdateEventDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    const updatedEvent = await this.eventsService.updateEvent(
      id,
      updateEventDto,
    );
    if (updatedEvent!)
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    return updatedEvent;
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    const deletedEvent = await this.eventsService.deleteEvent(id);
    if (deletedEvent!)
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    return;
  }
}
