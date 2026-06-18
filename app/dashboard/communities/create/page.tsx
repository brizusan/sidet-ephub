import CreateCommunity from "@/src/features/communities/components/CreateCommunity";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: generateTitleMetadata("Comunidades - Nueva Comunidad"),
};

export default async function CreateCommunityPage() {
  const { isAuth, session } = await requireAuth();

  if (!isAuth) redirect("/");

  return (
    <>
      <Heading>Crear Comunidad</Heading>
      <Link
        href={"/dashboard/communities"}
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a mis Comunidades
      </Link>

      <CreateCommunity />
    </>
  );
}
