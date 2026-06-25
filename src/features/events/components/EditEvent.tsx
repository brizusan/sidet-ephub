"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import EventForm from "./EventForm";
import { FormProvider, useForm } from "react-hook-form";
import { EventInput, EventSchema } from "../schema/eventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectEvent } from "../types/events.type";
import { editEventAction } from "../actions/event-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  event: SelectEvent;
};

export default function EditEvent({ event }: Props) {
  const methods = useForm({
    resolver: zodResolver(EventSchema),
    mode: "all",
    defaultValues: event.virtual
      ? { ...event, virtual: true }
      : { ...event, location: event.location! },
  });

  const onSubmit = async (data: EventInput) => {
    const { error, success } = await editEventAction(data, event.id);

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
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <EventForm />
          <FormSubmit value={"Actualizar Registro"} />
        </Form>
      </FormProvider>
    </>
  );
}
