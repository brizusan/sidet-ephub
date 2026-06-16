import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generateTitleMetadata } from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: generateTitleMetadata("Dashboard"),
};

export default async function DashboardPage() {
  const { isAuth } = await requireAuth();

  if (!isAuth) redirect("/");

  return (
    <>
      <Heading>Panel de Administracion</Heading>
    </>
  );
}
