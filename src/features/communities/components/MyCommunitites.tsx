import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { redirect } from "next/navigation";
import { communityService } from "../services/CommunityService";
import Link from "next/link";
import CommunityItem from "./CommunityItem";

export default async function MyCommunitites() {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/login");

  const communities = await communityService.getUserCommunities(session.user);

  if (communities.length === 0) {
    return (
      <>
        <Heading level={3} className="mt-10 text-center">
          No tenemos comunidades registradas
        </Heading>
        <p className="text-lg text-center">
          Puede iniciar creando una{" "}
          <Link
            className="text-blue-400 hover:text-blue-600"
            href={"/dashboard/communities/create"}
          >
            Comunidad
          </Link>
        </p>
      </>
    );
  }

  return (
    <section className="mt-10">
      <Heading>Mis Comunidades</Heading>
      <ul role="list" className="mt-10 shadow-lg divide-y divide-gray-200">
        {communities.map((community) => (
          <CommunityItem key={community.data.id} community={community} />
        ))}
      </ul>
    </section>
  );
}
