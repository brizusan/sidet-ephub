import {
  ErrorForm,
  Form,
  FormInput,
  FormLabel,
} from "@/src/shared/components/forms";
import { useCommunityStore } from "../stores/community-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckPasswordInput,
  CheckPasswordSchema,
} from "../../auth/schemas/authSchema";
import { deleteCommunityAction } from "../actions/community-action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function DeleteCommunityForm() {
  const { setOpen, community, setCommunity } = useCommunityStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(CheckPasswordSchema),
    mode: "all",
  });

  const handleDeleteComunnity = async (data: CheckPasswordInput) => {
    if (!community) return;
    const { error, succes } = await deleteCommunityAction(data, community.id);
    if (error) {
      toast.error(error);
    } else {
      toast.success(succes);

      setOpen(false);

      setCommunity(null);

      setTimeout(() => {
        redirect("/dashboard/communities");
      }, 10000);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleDeleteComunnity)}>
      <FormLabel>Confirma con tu Password</FormLabel>
      <FormInput type="password" {...register("password")} />

      {errors.password && <ErrorForm>{errors.password.message}</ErrorForm>}

      <input
        type="submit"
        value="Eliminar Comunidad"
        className="inline-flex w-full justify-center  bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto dark:bg-red-500 dark:hover:bg-red-400"
      />

      <button
        type="button"
        data-autofocus
        onClick={() => {
          setOpen(false);
          setCommunity(null);
        }}
        className="mt-3 inline-flex w-full justify-center  bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto dark:bg-white/10 dark:text-white dark:inset-ring-white/5 dark:hover:bg-white/20"
      >
        Cancelar
      </button>
    </Form>
  );
}
