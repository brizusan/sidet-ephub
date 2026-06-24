import { ErrorForm, FormLabel } from "@/src/shared/components/forms";
import FormSelect from "@/src/shared/components/forms/FormSelect";
import { Suspense, use } from "react";
import { SelectCategory } from "../types/events.type";
import { useFormContext } from "react-hook-form";
import { EventInput } from "../schema/eventSchema";

const categoriesPromise = fetch(`/api/categories`).then((res) => res.json());

function CategoryOptions() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventInput>();
  const categories = use<SelectCategory[]>(categoriesPromise);

  return (
    <>
      <FormLabel>Categorias del Evento</FormLabel>

      <FormSelect {...register("categoryId")}>
        <option value={""}> --- Selecciona Categoria --- </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </FormSelect>

      {errors.categoryId && <ErrorForm>{errors.categoryId.message}</ErrorForm>}
    </>
  );
}

export default function CategoryFormField() {
  return (
    <Suspense fallback="Cargando....">
      <CategoryOptions />
    </Suspense>
  );
}
