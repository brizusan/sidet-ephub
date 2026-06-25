import { User } from "better-auth";
import { SelectEvent } from "../types/events.type";

export class EventPolicy {
  static isAdmin(user: User, event: SelectEvent): boolean {
    return user.id === event.createdBy;
  }

  static canViewAttendes(user: User, event: SelectEvent): boolean {
    return this.isAdmin(user, event);
  }

  static canEdit(user: User, event: SelectEvent): boolean {
    return this.isAdmin(user, event);
  }

  static canDelete(user: User, event: SelectEvent): boolean {
    return this.isAdmin(user, event);
  }
}
