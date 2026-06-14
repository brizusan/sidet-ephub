import Heading from "@/components/typography/Heading";
import RegisterForm from "@/src/features/auth/components/RegisterForm";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitleMetadata("Crear Cuenta"),
};

export default function RegisterPage() {
  return (
    <>
      <Heading className="text-center">Crear Cuenta</Heading>

      <RegisterForm />

      <nav className="mt-4 flex flex-col lg:flex-row items-center lg:justify-between gap-2">
        <Link
          className="text-sm  text-slate-500 hover:text-blue-500 transition-colors"
          href={"/auth/login"}
        >
          Tienes una cuenta? Inicia sesión
        </Link>

        <Link
          className="text-sm  text-slate-500 hover:text-blue-500 transition-colors"
          href={"/auth/forgot-password"}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  );
}
