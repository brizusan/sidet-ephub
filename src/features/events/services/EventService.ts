import { User } from "better-auth";
import { EventInput } from "../schema/eventSchema";
import { eventRepository, IEventRepository } from "./EventRepository";
import {
  communityRepository,
  IcommunityRepository,
} from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { EventPolicy } from "../policies/EventPolicy";

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

  async getUpComminEventByUser(user: User) {
    const upcommingEvents = await this.eventRepository.findUpCommingByUser(
      user.id,
    );

    const enriched = await Promise.all(
      upcommingEvents.map(async (event) => {
        return {
          data: event,
          attendanceCount: 0,
          context: {
            isAdmin: EventPolicy.isAdmin(user, event),
          },
          permissions: {
            canViewAttendes: EventPolicy.canViewAttendes(user, event),
            canEdit: EventPolicy.canEdit(user, event),
            canDelete: EventPolicy.canDelete(user, event),
          },
        };
      }),
    );

    return enriched;
  }

  async getEventById(eventId: string) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) throw new Error("Evento no encontrado");
    return event;
  }

  async getEventWithPermisions(eventId: string, user: User) {
    const event = await this.getEventById(eventId);

    return {
      data: event,
      context: {
        isAdmin: EventPolicy.isAdmin(user, event),
      },
      persissions: {
        canViewAttendes: EventPolicy.canViewAttendes(user, event),
        canEdit: EventPolicy.canEdit(user, event),
        canDelete: EventPolicy.canDelete(user, event),
      },
    };
  }

  async updateEvent(eventId: string, data: EventInput, user: User) {
    const community = await this.communityRepository.findById(data.communityId);

    if (!community || !CommunityPolicy.isAdmin(user, community)) {
      throw new Error("No tienes los suficientes Privilegios");
    }

    const event = await this.getEventWithPermisions(eventId, user);
    if (!event.persissions.canEdit) {
      throw new Error("No tienes los suficientes Privilegios");
    }

    await this.eventRepository.update(
      { ...data, createdBy: user.id },
      event.data.id,
    );
  }
}

export const eventService = new EventService(
  eventRepository,
  communityRepository,
);
