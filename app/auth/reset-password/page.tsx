import ResetPasswordForm from "@/src/features/auth/components/ResetPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";

export default function page() {
  return (
    <>
      <Heading className="text-center">Reestablecer Contraseña</Heading>
      <ResetPasswordForm />
      {/* <nav className="mt-4 flex flex-col lg:flex-row items-center lg:justify-between gap-2">
        <Link
          className="text-sm  text-slate-500 hover:text-blue-500 transition-colors"
          href={"/auth/create-account"}
        >
          Tienes una cuenta? ,Inicia sesión
        </Link>

        <Link
          className="text-sm  text-slate-500 hover:text-blue-500 transition-colors"
          href={"/auth/create-account"}
        >
          No tienes una cuenta? Regístrate
        </Link>
      </nav> */}
    </>
  );
}
