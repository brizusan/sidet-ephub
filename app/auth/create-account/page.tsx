import Heading from "@/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generateTitleMetadata("Crear Cuenta"),
};

export default function RegisterPage() {
  return (
    <>
      <Heading>Crear Cuenta</Heading>
    </>
  );
}
