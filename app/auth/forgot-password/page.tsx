import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generateTitleMetadata("Recuperar contraseña"),
};
export default function ForgotPassword() {
  return (
    <>
      <Heading className="text-center">Recuperar tu contraseña</Heading>
      <ForgotPasswordForm />
    </>
  );
}
