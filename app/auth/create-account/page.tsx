import Heading from "@/components/typography/Heading";
import RegisterForm from "@/src/features/auth/components/RegisterForm";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generateTitleMetadata("Crear Cuenta"),
};

export default function RegisterPage() {
  return (
    <>
      <Heading className="text-center">Crear Cuenta</Heading>

      <RegisterForm />
    </>
  );
}
