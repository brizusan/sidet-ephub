import {
  FormLabel,
  FormInput,
  FormToggle,
  FormTextArea,
} from "@/src/shared/components/forms";
import CommunityFormField from "./CommunityFormField";
import CategoryFormField from "./CategoryFormField";
import dynamic from "next/dynamic";
import LocationPicker from "./LocationPicker";

const DynamicLocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
});

export default function EventForm() {
  return (
    <>
      <fieldset className="space-y-3">
        <legend className="font-black text-4xl mb-5">
          Detalles del Evento
        </legend>

        <FormLabel htmlFor="title">Nombre Meeti</FormLabel>
        <FormInput id="title" type="text" placeholder="Titulo de evento" />

        <FormLabel htmlFor="details">Detalles</FormLabel>
        <FormTextArea id="details" placeholder="Descripción de evento" />

        <CategoryFormField />
        <CommunityFormField />

        <FormLabel htmlFor="availableSeats">Cupo</FormLabel>
        <FormInput
          type="number"
          min={1}
          id="availableSeats"
          placeholder="Cupo Disponible"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-3">
            <FormLabel htmlFor="date">Fecha:</FormLabel>
            <FormInput type="date" id="date" />
          </div>
          <div className="space-y-3">
            <FormLabel htmlFor="time">Hora:</FormLabel>
            <FormInput type="time" step={1800} id="time" />
          </div>
        </div>

        <FormLabel htmlFor="virtual">¿Evento Virtual?</FormLabel>
        <FormToggle />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-black text-4xl mb-5">
          Ubicación de Evento
        </legend>

        <DynamicLocationPicker />

        <FormLabel id="place_name">Nombre Lugar:</FormLabel>
        <FormInput
          id="place_name"
          type="text"
          placeholder="Nombre Lugar evento"
        />
      </fieldset>
    </>
  );
}
