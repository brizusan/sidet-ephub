import z from "zod";

export const GeoCodeSchema = z.object({
  LongLabel: z.string(),
  City: z.string(),
  CntryName: z.string(),
  InputX: z.number(),
  InputY: z.number(),
});

const BaseSchema = z.object({
  title: z.string().min(1, { message: "El Titulo es Obligatorio" }),
  details: z.string().min(50, { message: "Añade más detalles al Evento" }),
  image: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: "La imagen es obligatoria",
  }),
  communityId: z.uuid({ message: "Elige Una Comunidad" }),
  availableSeats: z.coerce
    .number()
    .min(1, { message: "El Cupo debe ser Mayor a 0" }),
  date: z.iso.date({ message: "Añade una Fecha" }),
  time: z.string().min(1, { message: "La Hora es Obligatoria" }),
  categoryId: z.uuid({ message: "Elige Una Categoría" }),
});

const eventLocationSchema = z.object({
  placeName: z
    .string()
    .min(1, { message: "El Nombre del Lugar es obligatorio" }),
  address: z.string().min(1, { message: "La Dirección Lugar es obligatoria" }),
  city: z.string().min(1, { message: "La ciudad es obligatoria" }),
  country: z.string().min(1, { message: "El país es obligatorio" }),
  lat: z
    .number({ error: "Ubicación no válida" })
    .min(-90, { error: "Ubicación no válida" })
    .max(90, { error: "Ubicación no válida" }),
  lng: z
    .number({ error: "Ubicación no válida" })
    .min(-90, { error: "Ubicación no válida" })
    .max(90, { error: "Ubicación no válida" }),
});

const VirtualeventSchema = BaseSchema.extend({
  virtual: z.literal(true),
});

const PhysicaleventSchema = BaseSchema.extend({
  virtual: z.literal(false),
  location: eventLocationSchema,
});

export const EventSchema = z.discriminatedUnion("virtual", [
  VirtualeventSchema,
  PhysicaleventSchema,
]);

export type EventInput = z.infer<typeof EventSchema>;
export type EventOutput = z.output<typeof EventSchema>;
