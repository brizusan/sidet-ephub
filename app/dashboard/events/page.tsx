import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

const title = "Administra tus eventos";

export const metadata: Metadata = {
  title: generateTitleMetadata(title),
};

export default async function EventsPage() {
  const { session } = await requireAuth();

  if (!session) redirect("/auth/login");
  return (
    <>
      <Heading>{title}</Heading>

      <Link
        href={"/dashboard/events/create"}
        className="mt-5 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded shadow"
      >
        Crear Evento
      </Link>
    </>
  );
}
