import Footer from "@/components/Footer";
import { Navbar, NavbarItem } from "@/components/Navbar";
import AboutSection from "@/components/home/AboutSection";
import Hero from "@/components/home/Hero";
import PromotionSection from "@/components/home/PromotionSection";
import TryTodaySection from "@/components/home/TryTodaySection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fleet | Opensource Logistics Management Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <NavbarItem to="/" name="Home" />
        <NavbarItem to="/services" name="Services" />
        <NavbarItem to="/about" name="About" />
      </Navbar>
      <main className="h-full min-h-screen w-full ">
        <Hero />
        <AboutSection />
        <PromotionSection />
        <TryTodaySection />
      </main>
      <Footer />
    </>
  );
}
