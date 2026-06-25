import { DynamicEventLocation } from "@/src/features/events/components/DynamicEventLocation";
import OrganizerCard from "@/src/features/events/components/OrganizerCard";
import { eventService } from "@/src/features/events/services/EventService";
import Heading from "@/src/shared/components/typography/Heading";
import { displayDate } from "@/src/shared/utils/date";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: PageProps<"/event/[id]">): Promise<Metadata> {
  const { id } = await params;
  const event = await eventService.getEventById(id);

  return {
    title: generateTitleMetadata(`${event.title}`),
  };
}

export default async function EventPage(props: PageProps<"/event/[id]">) {
  const { id } = await props.params;
  const event = await eventService.getEventWithDetails(id);

  const isVirtual = event.data.virtual;

  const location = event.data.location;

  return (
    <>
      <nav className="py-5 border-b border-gray-200 px-5 lg:px-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-3  items-start lg:flex-row lg:justify-between lg:gap-0">
          <p className=" text-gray-600">
            Categoría:{" "}
            <Link
              href={`/categories/${event.data.category.id}`}
              className="font-semibold"
            >
              {event.data.category.name}
            </Link>
          </p>
          <p className=" text-gray-600">
            Comunidad:{" "}
            <Link
              href={`/communities/${event.data.communities.id}`}
              className="font-semibold"
            >
              {event.data.communities.name}
            </Link>
          </p>
        </div>
      </nav>

      <Heading className="text-center font-semibold mt-12">
        {event.data.title}
      </Heading>

      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 p-5 lg:px-0 mt-10">
        <section className="lg:col-span-2">
          <Image
            src={event.data.image}
            alt={`Imagen de evento - ${event.data.title}`}
            width={600}
            height={400}
            priority
          />

          <p className="mt-5 text-lg">{event.data.details}</p>
        </section>

        <aside className="bg-slate-100 rounded-2xl">
          {isVirtual && (
            <p className="bg-orange-400 m-6 rounded-lg text-center p-3 text-white font-bold">
              Este evento es virtual
            </p>
          )}

          {location && !isVirtual && (
            <DynamicEventLocation
              address={location.address}
              lat={location.lat}
              lng={location.lng}
              placeName={location.placeName}
            />
          )}
          <section className="space-y-5 p-10 ">
            <Heading level={2} className="font-bold">
              Informacion Evento
            </Heading>

            <p>
              <span className="font-bold">Fecha:</span>{" "}
              {displayDate(event.data.date)}
            </p>

            <p>
              <span className="font-bold">Hora:</span> {event.data.time}{" "}
              {" Horas"}
            </p>

            <OrganizerCard organizer={event.data.admin} />
          </section>
        </aside>
      </main>
    </>
  );
}
