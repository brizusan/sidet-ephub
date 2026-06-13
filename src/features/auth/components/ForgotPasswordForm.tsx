"use client";

import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";

export default function ForgotPasswordForm() {
  return (
    <Form>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        id="email"
        placeholder="Ingresa el correo registrado"
        type="text"
      />

      <FormSubmit value="Enviar Instrucciones" />
    </Form>
  );
}
