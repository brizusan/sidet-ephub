"use server";

import { requireAuth } from "@/src/lib/auth-server";
import { membershipService } from "../services/MemberShipService";

export async function toogleMemberAction(communityId: string) {
  const { session } = await requireAuth();

  if (!session) throw new Error("usuario no autenticado");

  const response = await membershipService.toogleMembership(
    communityId,
    session.user,
  );

  return response;
}
