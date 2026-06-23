import { FormLabel } from "@/src/shared/components/forms";
import FormSelect from "@/src/shared/components/forms/FormSelect";
import { Suspense, use, useEffect, useState } from "react";
import { SelectCategory } from "../types/events.type";

const categoriesPromise = fetch(`/api/categories`).then((res) => res.json());

function CategoryOptions() {
  //   const [categories, setCategories] = useState<SelectCategory[]>([]);
  //   useEffect(() => {
  //     fetch("/api/categories").then((res) => res.json().then(setCategories));
  //   }, []);

  const categories = use<SelectCategory[]>(categoriesPromise);

  return (
    <>
      <FormLabel>Categorias del Evento</FormLabel>

      <FormSelect>
        <option value={""}> --- Selecciona Categoria --- </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </FormSelect>
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
