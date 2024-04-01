import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/schemas/Event.schema';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { UpdateEventDto } from './dto/UpdateEvent.dto';
import { Pdf } from 'src/schemas/pdf.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Pdf.name) private pdfModel: Model<Pdf>,
  ) {}
  createEvent(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  getEvents() {
    return this.eventModel.find().populate('pdfs');
  }

  getEventById(id: string) {
    return this.eventModel.findById(id).populate('pdfs');
  }

  getEventByDate(date: string) {
    return this.eventModel.find({ date }).populate('pdfs');
  }

  updateEvent(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto);
  }

  deleteEvent(id: string) {
    return this.eventModel.findByIdAndDelete(id);
  }
}
