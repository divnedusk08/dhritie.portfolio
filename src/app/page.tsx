
"use client"; 

import { useState } from "react";
import { BioGeneratorForm } from "@/components/about/bio-generator-form";
import { Separator } from "@/components/ui/separator";
import { UserCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Import section components
import AchievementsSection from "@/app/(main)/achievements/page";
import ProjectsSection from "@/app/(main)/projects/page";
import ContactSection from "@/app/(main)/contact/page";


export default function HomePage() {
  const [currentBio, setCurrentBio] = useState<string>(
    "Welcome to my personal space! I am a passionate individual dedicated to creating impactful solutions and continuously learning new things. Explore my work and achievements to get a better sense of my journey."
  );

  const handleBioUpdate = (newBio: string) => {
    setCurrentBio(newBio);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 page-transition">
        {/* About Me Section (Hero + Bio) */}
        <section id="about" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4 py-16 md:py-24">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-primary">Hi, I'm </span>
            <span className="text-accent">Dhriti Erusalagandi</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
            I'm a passionate entrepreneur driven by creativity, curiosity, and the desire to build something that makes a difference. I believe in solving real problems, telling impactful stories, and turning bold ideas into reality.
          </p>
        </section>

        <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
          {/* This div could also be part of the #about section or a new one like #bio */}
          <div className="py-6 md:py-8">
            <h2 className="mb-4 text-2xl font-semibold text-foreground flex items-center">
              <UserCircle2 className="mr-3 h-7 w-7" />
              About Me
            </h2>
            <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
              <p>{currentBio}</p>
              <p>
                Beyond my professional pursuits, I enjoy [mention a hobby or interest], 
                which helps me maintain a fresh perspective and creative drive. I'm always open 
                to new challenges and collaborations that push boundaries and create value.
              </p>
            </div>
          </div>
        
          <Separator className="my-12" />

          <div id="bio-generator"> {/* Optional: give bio generator its own ID if needed for direct linking */}
            <BioGeneratorForm onBioGenerated={handleBioUpdate} initialBio={currentBio} />
          </div>
        </div>
        
        {/* Achievements Section */}
        <section id="achievements" className="py-12 md:py-16 bg-muted/20 dark:bg-muted/10">
          <AchievementsSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-16">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16 bg-muted/20 dark:bg-muted/10">
          <ContactSection />
        </section>

      </main>
      <Footer />
    </div>
  );
}
