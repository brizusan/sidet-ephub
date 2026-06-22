import { communities, communityMembers } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { User } from "../../auth/types/auth.types";

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
  membersCount: number;
  context: CommunityContext;
  permissions: CommunityPermissions;
};

export type SelectCommunnityMembers = typeof communityMembers.$inferSelect;

export type JoinedCommunity = SelectCommunnityMembers & {
  communities: SelectCommunity;
  user: User;
};
