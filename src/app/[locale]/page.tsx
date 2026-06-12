// src/app/[locale]/page.tsx
// Wrap each section (except Navbar) in ScrollReveal for the fade-in-from-bottom effect.
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VisionCards from "@/components/VisionCards";
import Timeline from "@/components/Timeline";
import ActivitiesCarousel from "@/components/ActivitiesCarousel";
import VoteForm from "@/components/VoteForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <ScrollReveal><Hero /></ScrollReveal>
      <ScrollReveal><VoteForm /></ScrollReveal>
      <ScrollReveal><VisionCards /></ScrollReveal>
      <ScrollReveal><Timeline /></ScrollReveal>
      <ScrollReveal><ActivitiesCarousel /></ScrollReveal>
      <Footer />
    </main>
  );
}