import Link from "next/link";
import AboutSection from "@/components/AboutSection";
import { CheckResultProvider } from "@/components/CheckResultProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ResultsLedger from "@/components/ResultsLedger";
import SelfCheck from "@/components/SelfCheck";
import ServicesLadder from "@/components/ServicesLadder";
import TeardownForm from "@/components/TeardownForm";
import WorkGallery from "@/components/WorkGallery";

export default function Home() {
  return (
    <>
      <Link className="skip" href="#main">
        Skip to content
      </Link>
      <Header />
      <main id="main">
        <Hero />
        <ResultsLedger />
        <WorkGallery />
        <CheckResultProvider>
          <SelfCheck />
          <ServicesLadder />
          <AboutSection />
          <TeardownForm />
        </CheckResultProvider>
      </main>
      <Footer />
    </>
  );
}
