import { Navbar }            from "@/components/layout/Navbar";
import { Footer }            from "@/components/layout/Footer";
import { SectionDivider }    from "@/components/ui/SectionDivider";
import { HeroSection }       from "@/components/sections/HeroSection";
import { AboutSection }      from "@/components/sections/AboutSection";
import { ServicesSection }   from "@/components/sections/ServicesSection";
import { StackSection }      from "@/components/sections/StackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection }    from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider variant="violet" />
        <ServicesSection />
        <SectionDivider />
        <StackSection />
        <SectionDivider variant="violet" />
        <ExperienceSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
