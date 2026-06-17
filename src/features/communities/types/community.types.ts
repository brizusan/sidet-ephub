import { communities } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type CreateCommunity = InferInsertModel<typeof communities>;
export type SelectCommunity = InferSelectModel<typeof communities>;

export type CommunityPermissions = {
  canEdit: boolean;
  canDelete: boolean;
  canJoin: boolean;
  canLeave: boolean;
};

export type CommunityContext = {
  isAdmin: boolean;
  isMember: boolean;
};

export type CommunityWithPermisions = {
  data: SelectCommunity;
  context: CommunityContext;
  permissions: CommunityPermissions;
};
