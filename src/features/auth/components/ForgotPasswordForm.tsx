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
import { ForgotInput, ForgotSchema } from "../schemas/authSchema";
import { ForgotPasswordAction } from "../actions/auth-action";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ForgotSchema),
  });

  const handleForgot = async (data: ForgotInput) => {
    const { success, error } = await ForgotPasswordAction(data);

    if (success) {
      toast.success(success);
    } else {
      toast.error(error);
      reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleForgot)}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        id="email"
        placeholder="Ingresa el correo registrado"
        type="text"
        {...register("email")}
      />

      {errors.email ? <ErrorForm>{errors.email.message}</ErrorForm> : undefined}

      <FormSubmit value="Enviar Instrucciones" />
    </Form>
  );
}
