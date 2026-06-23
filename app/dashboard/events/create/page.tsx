import CreateEvent from "@/src/features/events/components/CreateEvent";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

const title = "Crear Evento";

export const metadata: Metadata = {
  title: generateTitleMetadata(title),
};
export default function CreateEventPage() {
  return (
    <>
      <Heading>{title}</Heading>

      <Link
        href={"/dashboard/events"}
        className="mt-5 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded shadow"
      >
        Ir a eventos
      </Link>

      <CreateEvent />
    </>
  );
}
