"use client";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { createCommunityAction } from "../actions/community-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function CreateCommunity() {
  const methods = useForm({
    resolver: zodResolver(CommunitySchema),
    mode: "all",
  });

  const handleCommunitySubmit = async (data: CommunityInput) => {
    const { success, error } = await createCommunityAction(data);

    if (success) {
      toast.success(success);
      redirect("/dashboard/communities");
    } else {
      toast.error(error);
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        className="max-w-2xl mx-auto"
        onSubmit={methods.handleSubmit(handleCommunitySubmit)}
      >
        <CommunityForm />
        <FormSubmit value={"Crear Comunidad"} />
      </Form>
    </FormProvider>
  );
}
