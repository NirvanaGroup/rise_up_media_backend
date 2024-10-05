
import { Resolver, Query, Args} from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './../schemas/Event.schema';
import { Int } from 'type-graphql';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  getTodayEvents() { 
    return this.eventsService.getTodayEvents();
  }

  @Query(() => Event)
  getEventById(@Args('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Query(() => [Event])
  getEventByDate(@Args('date') date: string) {
    return this.eventsService.getEventByDate(date);
  }

  @Query(() => [Event])
  getUpcomingEvents() {
    return this.eventsService.getUpcomingEvents();
  }

  @Query(() => [Event])
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Query(() => [Event])
  fetchEventsForMonth(
    @Args('month', { type: () => Int }) month: number,  // Ensure you're using Int
    @Args('year', { type: () => Int }) year: number,    // Ensure you're using Int
  ) {
    return this.eventsService.fetchEventsForMonth(month, year);
  }
  

}

