"use client";

import {
  ErrorForm,
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/src/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResePasswordInput, ResetPasswordSchema } from "../schemas/authSchema";
import { redirect, useSearchParams } from "next/navigation";
import { ResetPasswordAction } from "../actions/auth-action";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");

  if (!token) redirect("/auth/forgot-password");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur",
  });

  const handleResetPassword = async (data: ResePasswordInput) => {
    const { error, success } = await ResetPasswordAction(data, token);

    if (success) {
      toast.success(success);
      redirect("/auth/login");
    } else {
      toast.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleResetPassword)}>
      <FormLabel htmlFor="password">Nueva Contraseña</FormLabel>
      <FormInput
        id="password"
        placeholder="Ingresa tu nueva contraseña"
        type="password"
        {...register("newPassword")}
      />

      {errors.newPassword ? (
        <ErrorForm>{errors.newPassword.message}</ErrorForm>
      ) : null}

      <FormLabel htmlFor="repeat_password">Repetir Contraseña</FormLabel>
      <FormInput
        id="repeat_password"
        placeholder="Ingresa tu nueva contraseña"
        type="password"
        {...register("repeat_password")}
      />

      {errors.repeat_password ? (
        <ErrorForm>{errors.repeat_password.message}</ErrorForm>
      ) : null}

      <FormSubmit value="Reestablecer Contraseña" />
    </Form>
  );
}
