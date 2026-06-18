"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { SelectCommunity } from "../types/community.types";
import { updateCommunityAction } from "../actions/community-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type PropsEdit = {
  community: SelectCommunity;
};

export default function EditCommunity({ community }: PropsEdit) {
  const methods = useForm({
    resolver: zodResolver(CommunitySchema),
    mode: "all",
    defaultValues: {
      name: community.name,
      description: community.description,
      image: community.imageUrl,
    },
  });

  const handleEditCommunity = async (data: CommunityInput) => {
    const { error, succes } = await updateCommunityAction(data, community.id);

    if (succes) {
      toast.success(succes);
      redirect("/dashboard/communities");
    } else {
      toast.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        className="max-w-2xl mx-auto"
        onSubmit={methods.handleSubmit(handleEditCommunity)}
      >
        <CommunityForm />
        <FormSubmit value={"Guardar Cambios"} />
      </Form>
    </FormProvider>
  );
}
