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
import { LoginUserAction } from "../actions/auth-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

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
    const { success, error } = await LoginUserAction(data);

    if (success) {
      toast.success(success);
      redirect("/dashboard");
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
