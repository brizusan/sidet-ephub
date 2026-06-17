import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitleMetadata("Comunidades - Ingresar"),
};

export default function JoinedComunityPage() {
  return (
    <>
      <Heading>Ingresar a Comunidad</Heading>
      <Link
        href={"/dashboard/communities"}
        className="mt-5 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded"
      >
        Volver a mis Comunidades
      </Link>
    </>
  );
}
