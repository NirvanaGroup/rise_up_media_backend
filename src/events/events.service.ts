import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../schemas/event.schema';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { UpdateEventDto } from './dto/UpdateEvent.dto';
import { Pdf } from '../schemas/pdf.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Pdf.name) private pdfModel: Model<Pdf>,
  ) {}

  createEvent(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    console.log(newEvent);
    return newEvent.save();
  }

  getTodayEvents() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return this.eventModel
      .find({ date: formattedDate })
      .populate('pdfs')
      .exec();
  }

  getUpcomingEvents() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return this.eventModel
      .find({ date: { $gt: formattedDate } })
      .populate('pdfs')
      .exec();
  }

  getAllEvents() {
    return this.eventModel
      .find()
      .populate('pdfs')
      .exec();
  }

  getEventById(id: string) {
    return this.eventModel
      .findById(id)
      .populate('pdfs')
      .exec();
  }

  getEventByDate(date: string) {
    return this.eventModel
      .find({ date })
      .populate('pdfs')
      .exec();
  }

  updateEvent(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .populate('pdfs')
      .exec();
  }

  deleteEvent(id: string) {
    return this.eventModel
      .findByIdAndDelete(id)
      .exec();
  }
}

