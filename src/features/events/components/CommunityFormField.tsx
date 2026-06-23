import { FormLabel } from "@/src/shared/components/forms";
import FormSelect from "@/src/shared/components/forms/FormSelect";
import { Suspense, use, useEffect, useState } from "react";

type Community = {
  id: string;
  name: string;
};

function CommunityOptions() {
  const [communities, setCommunities] = useState<Community[]>([]);
  useEffect(() => {
    fetch("/api/user/communities").then((res) =>
      res.json().then(setCommunities),
    );
  }, []);

  return (
    <>
      <FormLabel>Communidad del Evento</FormLabel>

      <FormSelect>
        <option value={""}> --- Selecciona Comunidad --- </option>
        {communities.map((community) => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </FormSelect>
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
