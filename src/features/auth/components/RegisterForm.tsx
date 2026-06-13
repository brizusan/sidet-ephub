"use client";

import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";

export default function RegisterForm() {
  return (
    <Form>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput id="name" placeholder="Ingresa tu nombre" type="text" />
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput id="email" placeholder="Ingresa un correo" type="email" />
      <FormLabel htmlFor="password">Contraseña</FormLabel>
      <FormInput
        id="password"
        placeholder="Ingresa una contraseña"
        type="password"
      />
      <FormLabel htmlFor="repeat_password">Repetir Contraseña</FormLabel>
      <FormInput
        id="repeat_password"
        placeholder="Minimo de 8 caracteres"
        type="password"
      />
      <FormSubmit value="Crear Cuenta" />
    </Form>
  );
}
