import Heading from "@/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generateTitleMetadata("Iniciar Sesión"),
};

export default function LoginPage() {
  return (
    <>
      <Heading>Iniciar Sesión</Heading>
    </>
  );
}
