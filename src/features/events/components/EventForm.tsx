import {
  FormLabel,
  FormInput,
  FormToggle,
  FormTextArea,
  ErrorForm,
} from "@/src/shared/components/forms";
import CommunityFormField from "./CommunityFormField";
import CategoryFormField from "./CategoryFormField";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { EventInput } from "../schema/eventSchema";
import UploadImage from "@/src/shared/components/upload/UploadImage";

const DynamicLocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
});

export default function EventForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext<EventInput>();

  const isVirtual = watch("virtual");

  const isVisible = isVirtual ? true : false;

  return (
    <>
      <fieldset className="space-y-3">
        <legend className="font-black text-4xl mb-5">
          Detalles del Evento
        </legend>

        <FormLabel htmlFor="title">Nombre Meeti</FormLabel>
        <FormInput
          id="title"
          type="text"
          placeholder="Titulo de evento"
          {...register("title")}
        />

        {errors.title && <ErrorForm>{errors.title.message}</ErrorForm>}

        <FormLabel htmlFor="details">Detalles</FormLabel>
        <FormTextArea
          id="details"
          placeholder="Descripción de evento"
          {...register("details")}
        />
        {errors.details && <ErrorForm>{errors.details.message}</ErrorForm>}

        <FormLabel>Imagen de Evento: </FormLabel>
        <UploadImage />

        <CategoryFormField />
        <CommunityFormField />

        <FormLabel htmlFor="availableSeats">Cupo</FormLabel>
        <FormInput
          type="number"
          min={1}
          id="availableSeats"
          placeholder="Cupo Disponible"
          {...register("availableSeats")}
        />

        {errors.availableSeats && (
          <ErrorForm>{errors.availableSeats.message}</ErrorForm>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-3">
            <FormLabel htmlFor="date">Fecha:</FormLabel>
            <FormInput type="date" id="date" {...register("date")} />
            {errors.date && <ErrorForm>{errors.date.message}</ErrorForm>}
          </div>
          <div className="space-y-3">
            <FormLabel htmlFor="time">Hora:</FormLabel>
            <FormInput
              type="time"
              step={1800}
              id="time"
              {...register("time")}
            />
            {errors.time && <ErrorForm>{errors.time.message}</ErrorForm>}
          </div>
        </div>

        <FormLabel htmlFor="virtual">¿Evento Virtual?</FormLabel>
        <FormToggle
          onChange={(e) => setValue("virtual", e.target.checked)}
          checked={isVirtual}
        />
      </fieldset>

      {isVisible ? null : (
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
            {...register("location.placeName")}
          />
          {"location" in errors && (
            <ErrorForm>{errors.location?.placeName?.message}</ErrorForm>
          )}
        </fieldset>
      )}
    </>
  );
}
