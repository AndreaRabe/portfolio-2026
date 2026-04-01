import { Navbar }              from "@/components/layout/Navbar";
import { Footer }              from "@/components/layout/Footer";
import { SectionDivider }      from "@/components/ui/SectionDivider";
import { HeroSection }         from "@/components/sections/HeroSection";
import { AboutSection }        from "@/components/sections/AboutSection";
import { ServicesSection }     from "@/components/sections/ServicesSection";
import { ProjectsSection }     from "@/components/sections/ProjectsSection";
import { StackSection }        from "@/components/sections/StackSection";
import { ExperienceSection }   from "@/components/sections/ExperienceSection";
import { MetricsSection }      from "@/components/sections/MetricsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection }      from "@/components/sections/ContactSection";

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
        <ProjectsSection />
        <SectionDivider variant="violet" />
        <StackSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider variant="violet" />
        <MetricsSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider variant="violet" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
