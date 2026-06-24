"use client";

import { Form, FormSubmit } from "@/src/shared/components/forms";
import EventForm from "./EventForm";
import { useSession } from "@/src/lib/auth-client";
import { FormProvider, useForm } from "react-hook-form";
import { EventInput, EventSchema } from "../schema/eventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventAction } from "../actions/event-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateEvent() {
  const methods = useForm({
    resolver: zodResolver(EventSchema),
    mode: "all",
    defaultValues: {
      title: "",
      details: "",
      categoryId: "",
      communityId: "",
      availableSeats: 0,
      date: "",
      time: "",
      image: "",
      virtual: false,
      location: {
        placeName: "",
        address: "",
        city: "",
        country: "",
        lat: -12.0463236,
        lng: -77.0603639,
      },
    },
  });

  const { isPending } = useSession();

  if (isPending) return "cargando...";

  const onSubmit = async (data: EventInput) => {
    const { error, success } = await createEventAction(data);

    if (error) {
      toast.error(error);
    } else {
      toast.success(success);
      redirect("/dashboard/events");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-2xl"
          noValidate
        >
          <EventForm />
          <FormSubmit value={"Registrar Evento"} />
        </Form>
      </FormProvider>
    </>
  );
}
