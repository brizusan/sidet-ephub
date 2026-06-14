import Heading from "@/components/typography/Heading";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitleMetadata("Iniciar Sesión"),
};

export default function LoginPage() {
  return (
    <>
      <Heading className="text-center">Iniciar Sesión</Heading>

      <LoginForm />

      <nav className="mt-4 flex flex-col lg:flex-row items-center lg:justify-between gap-2">
        <Link
          className="text-sm  text-slate-500 hover:text-blue-500 transition-colors"
          href={"/auth/create-account"}
        >
          ¿No tienes una cuenta? Regístrate
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
