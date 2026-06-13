import Heading from "@/components/typography/Heading";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generateTitleMetadata("Iniciar Sesión"),
};

export default function LoginPage() {
  return (
    <>
      <Heading className="text-center">Iniciar Sesión</Heading>

      <LoginForm />
    </>
  );
}
