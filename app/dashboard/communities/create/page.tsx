import CreateCommunity from "@/src/features/communities/components/CreateCommunity";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitleMetadata("Comunidades - Nueva Comunidad"),
};

export default function CreateCommunityPage() {
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
