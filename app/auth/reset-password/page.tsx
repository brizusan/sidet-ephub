import ResetPasswordForm from "@/src/features/auth/components/ResetPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";

export default function ResetPassworPage() {
  return (
    <>
      <Heading className="text-center">Reestablecer Contraseña</Heading>
      <ResetPasswordForm />
    </>
  );
}
