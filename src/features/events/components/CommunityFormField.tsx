import { ErrorForm, FormLabel } from "@/src/shared/components/forms";
import FormSelect from "@/src/shared/components/forms/FormSelect";
import { Suspense, use, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { EventInput } from "../schema/eventSchema";

type Community = {
  id: string;
  name: string;
};

function CommunityOptions() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const {
    register,
    formState: { errors },
  } = useFormContext<EventInput>();
  useEffect(() => {
    fetch("/api/user/communities").then((res) =>
      res.json().then(setCommunities),
    );
  }, []);

  return (
    <>
      <FormLabel>Communidad del Evento</FormLabel>

      <FormSelect {...register("communityId")}>
        <option value={""}> --- Selecciona Comunidad --- </option>
        {communities.map((community) => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </FormSelect>

      {errors.communityId && (
        <ErrorForm>{errors.communityId.message}</ErrorForm>
      )}
    </>
  );
}

export default function CommunityFormField() {
  return (
    <Suspense fallback="Cargando....">
      <CommunityOptions />
    </Suspense>
  );
}
