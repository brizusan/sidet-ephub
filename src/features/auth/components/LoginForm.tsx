"use client";

import {
  ErrorForm,
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";
import { useForm } from "react-hook-form";
import { LoginInput, LoginSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "../actions/auth-action";
import toast from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSignIn = async (data: LoginInput) => {
    const { success, error } = await LoginUser(data);

    if (success) {
      toast.success(success);
    } else {
      toast.error(error);
      reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        id="email"
        placeholder="Ingresa un correo"
        type="text"
        {...register("email")}
      />
      {errors.email ? <ErrorForm>{errors.email.message}</ErrorForm> : null}
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

      <FormSubmit value="Iniciar Sesión" />
    </Form>
  );
}
