import { User } from "better-auth";
import { EventInput } from "../schema/eventSchema";
import { eventRepository, IEventRepository } from "./EventRepository";
import {
  communityRepository,
  IcommunityRepository,
} from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";

class EventService {
  constructor(
    private eventRepository: IEventRepository,
    private communityRepository: IcommunityRepository,
  ) {}

  async createEvent(data: EventInput, user: User) {
    const community = await this.communityRepository.findById(data.communityId);
    if (!community || !CommunityPolicy.isAdmin(user, community)) {
      throw new Error("No tienes los suficientes Privilegios");
    }

    await this.eventRepository.insert({ ...data, createdBy: user.id });
  }
}

export const eventService = new EventService(
  eventRepository,
  communityRepository,
);
