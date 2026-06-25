import EditEvent from "@/src/features/events/components/EditEvent";
import { eventService } from "@/src/features/events/services/EventService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/dashboard/communities/[id]/edit">): Promise<Metadata> {
  const { id } = await params;
  const event = await eventService.getEventById(id);

  return {
    title: `Editar Evento ${event.title}`,
  };
}

export default async function EditEventPage(
  props: PageProps<"/dashboard/communities/[id]/edit">,
) {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/login");
  const { id } = await props.params;
  const event = await eventService.getEventWithPermisions(id, session.user);
  if (!event.context.isAdmin) throw new Error("No Autorizado");
  return (
    <>
      <Heading>Editar Evento {event.data.title}</Heading>
      <Link
        href={"/dashboard/events"}
        className="mt-5 lg:mt-8 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded shadow"
      >
        Ir a Eventos
      </Link>

      <EditEvent event={event.data} />
    </>
  );
}
