"use client";

import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";

export default function LoginForm() {
  return (
    <Form>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput id="email" placeholder="Ingresa un correo" type="text" />
      <FormLabel htmlFor="password">Contraseña</FormLabel>
      <FormInput
        id="password"
        placeholder="Ingresa una contraseña"
        type="password"
      />

      <FormSubmit value="Iniciar Sesión" />
    </Form>
  );
}
