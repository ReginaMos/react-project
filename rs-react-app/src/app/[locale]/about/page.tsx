import AboutPage from "../../../pages/AboutPage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default function About({ params }: { params: { locale: string } }) {
  const { locale } = params;
  if (!["en", "ru"].includes(locale)) notFound();
  return <AboutPage />;
}
