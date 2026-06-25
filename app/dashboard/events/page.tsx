import EventDropdownMenu from "@/src/features/events/components/EventDropdownMenu";
import { eventService } from "@/src/features/events/services/EventService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { formatEventDate } from "@/src/shared/utils/date";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { pluralize } from "@/src/shared/utils/string";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const title = "Administra tus eventos";

export const metadata: Metadata = {
  title: generateTitleMetadata(title),
};

export default async function EventsPage() {
  const { session } = await requireAuth();

  if (!session) redirect("/auth/login");

  const events = await eventService.getUpComminEventByUser(session.user);

  return (
    <>
      <Heading>{title}</Heading>

      <Link
        href={"/dashboard/events/create"}
        className="mt-5 block lg:inline-block text-center bg-orange-400 hover:bg-orange-500 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold rounded shadow"
      >
        Crear Evento
      </Link>

      {events.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 dark:divide-white/5 mt-10 shadow-lg p-10"
        >
          {events.map((event) => {
            const { title, id, date, image, time } = event.data;
            return (
              <li className="flex justify-between gap-x-6 py-5" key={id}>
                <div className="flex items-center min-w-0 gap-x-4">
                  <Image
                    src={image}
                    alt={`Imagen de evento ${title}`}
                    height={150}
                    width={250}
                    className="object-cover w-40 h-60"
                    priority
                  />
                  <img />
                  <div className="min-w-0 flex-auto">
                    <Link
                      href={`/event/${id}`}
                      className="hover:underline font-bold text-lg"
                    >
                      {title}
                    </Link>
                    <p className="text-gray-600 text-sm">
                      {formatEventDate(date, time)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {event.attendanceCount}{" "}
                      {pluralize("Asistent", event.attendanceCount)}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  {event.context.isAdmin && (
                    <EventDropdownMenu event={event.data} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center mt-10 text-lg">
          No tenemos eventos aún{" "}
          <Link
            href={"/dashboard/events/create"}
            className="text-orange-500 font-bold"
          >
            Comienza Creando Uno{" "}
          </Link>
        </p>
      )}
    </>
  );
}
