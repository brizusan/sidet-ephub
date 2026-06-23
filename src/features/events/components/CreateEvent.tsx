"use client";

import { Form, FormSubmit } from "@/src/shared/components/forms";
import EventForm from "./EventForm";
import { useSession } from "@/src/lib/auth-client";

export default function CreateEvent() {
  const { isPending } = useSession();

  if (isPending) return "cargando...";
  return (
    <>
      <Form className="max-w-2xl">
        <EventForm />
        <FormSubmit value={"Registrar Evento"} />
      </Form>
    </>
  );
}
