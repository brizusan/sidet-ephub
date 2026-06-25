import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },

  // Modelo de relacion para communidades unido
  communityMembers: {
    communities: r.one.communities({
      from: r.communityMembers.communityId,
      to: r.communities.id,
      optional: false,
    }),
    user: r.one.users({
      from: r.communityMembers.userId,
      to: r.users.id,
      optional: false,
    }),
  },

  // Relacion con Eventos
  event: {
    location: r.one.eventLocations({
      from: r.event.id,
      to: r.eventLocations.eventId,
    }),
    category: r.one.category({
      from: r.event.categoryId,
      to: r.category.id,
      optional: false,
    }),
    communities: r.one.communities({
      from: r.event.communityId,
      to: r.communities.id,
      optional: false,
    }),
    admin: r.one.users({
      from: r.event.createdBy,
      to: r.users.id,
      optional: false,
    }),
  },
}));
