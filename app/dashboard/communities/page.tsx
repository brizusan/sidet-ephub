import DeleteCommunityModal from "@/src/features/communities/components/DeleteCommunityModal";
import MyCommunitites from "@/src/features/communities/components/MyCommunitites";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: generateTitleMetadata("Comunidades"),
};

export default async function CommunitiesPage() {
  const { isAuth } = await requireAuth();

  if (!isAuth) redirect("/");
  return (
    <>
      <Heading>Gestionar Comunidades</Heading>

      <div className="flex justify-between flex-col lg:flex-row">
        <Link
          href={"/dashboard/communities/create"}
          className="mt-5 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded shadow"
        >
          Crear Comunidad
        </Link>
        <Link
          href={"/dashboard/communities/joined"}
          className="mt-5 block lg:inline-block text-center bg-pink-400 hover:bg-pink-600 rounded transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold shadow"
        >
          Comunidades a las que te uniste
        </Link>
      </div>

      <MyCommunitites />

      <DeleteCommunityModal />
    </>
  );
}
