"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  ErrorForm,
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";
import { RegisterInput, RegisterSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserAction } from "../actions/auth-action";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur", // distintos modos
  });

  const router = useRouter();

  const handleRegister = async (data: RegisterInput) => {
    const { error, success } = await registerUserAction(data);

    if (error) {
      toast.error(error);
    } else {
      toast.success(success);
      reset();
      router.replace("/auth/login");
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput
        id="name"
        placeholder="Ingresa tu nombre"
        type="text"
        {...register("name")}
      />
      {errors.name ? <ErrorForm>{errors.name.message}</ErrorForm> : null}

      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        id="email"
        placeholder="Ingresa un correo"
        type="string"
        {...register("email")}
      />
      {errors.email ? (
        <ErrorForm>{errors.email.message?.toString()}</ErrorForm>
      ) : null}

      <FormLabel htmlFor="password">Contraseña</FormLabel>

      <FormInput
        id="password"
        placeholder="Ingresa una contraseña"
        type="password"
        {...register("password")}
      />
      {errors.password ? (
        <ErrorForm>{errors.password.message}</ErrorForm>
      ) : null}

      <FormLabel htmlFor="repeat_password">Repetir Contraseña</FormLabel>
      <FormInput
        id="repeat_password"
        placeholder="Minimo de 8 caracteres"
        type="password"
        {...register("repeat_password")}
      />
      {errors.repeat_password ? (
        <ErrorForm>{errors.repeat_password.message}</ErrorForm>
      ) : null}

      <FormSubmit value="Crear Cuenta" />
    </Form>
  );
}
