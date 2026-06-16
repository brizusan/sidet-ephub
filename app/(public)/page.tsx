import Hero from "@/components/ui/Hero";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generateTitleMetadata("Inicio"),
};

export default async function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
