import CommunityItem from "@/src/features/communities/components/CommunityItem";
import { membershipService } from "@/src/features/communities/services/MemberShipService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: generateTitleMetadata("Comunidades - Ingresar"),
};

export default async function JoinedComunityPage() {
  const { session } = await requireAuth();

  if (!session) redirect("/");

  const communities = await membershipService.getJoinCommunities(session.user);

  return (
    <>
      <Heading>Ingresar a Comunidad</Heading>
      <Link
        href={"/dashboard/communities"}
        className="mt-5 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded"
      >
        Volver a mis Comunidades
      </Link>

      {communities.length ? (
        <ul role="list" className="mt-12 shadow-lg divide-y divide-gray-200">
          {communities.map((community) => (
            <CommunityItem key={community.data.id} community={community} />
          ))}
        </ul>
      ) : (
        <>
          <Heading level={3} className="mt-10 text-center">
            No te has unido a una comunidad aún
          </Heading>
        </>
      )}
    </>
  );
}
