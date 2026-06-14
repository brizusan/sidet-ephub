import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitleMetadata("Recuperar contraseña"),
};
export default function ForgotPassword() {
  return (
    <>
      <Heading className="text-center">Recuperar tu contraseña</Heading>
      <ForgotPasswordForm />
      <nav className="mt-4 flex flex-col lg:flex-row items-center lg:justify-between gap-2">
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
      </nav>
    </>
  );
}
