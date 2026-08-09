import { setRequestLocale } from "next-intl/server";
import { ServiciosHero } from "@/components/servicios/ServiciosHero";
import { AudienceMarquee } from "@/components/servicios/AudienceMarquee";
import { ServiciosProjects } from "@/components/servicios/ServiciosProjects";
import { ServiciosPlans } from "@/components/servicios/ServiciosPlans";
import { ServiciosWhy } from "@/components/servicios/ServiciosWhy";
import { ServiciosSteps } from "@/components/servicios/ServiciosSteps";
import { ServiciosAbout } from "@/components/servicios/ServiciosAbout";
import { ServiciosFaq } from "@/components/servicios/ServiciosFaq";
import { ServiciosCta } from "@/components/servicios/ServiciosCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServiciosHero />
      <AudienceMarquee />
      <ServiciosProjects />
      <ServiciosPlans />
      <ServiciosWhy />
      <ServiciosSteps />
      <ServiciosAbout />
      <ServiciosFaq />
      <ServiciosCta />
    </>
  );
}