
"use client"; 

import { useState, useEffect } from "react";
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

  const fullTitle = "Hi, I'm Dhriti Erusalagandi";
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (typedTitle.length < fullTitle.length) {
      const timeoutId = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, 100); // Adjust typing speed here (milliseconds)
      return () => clearTimeout(timeoutId);
    } else {
      // Optionally stop blinking cursor after typing is complete
      // setShowCursor(false); 
    }
  }, [typedTitle, fullTitle]);

  const handleBioUpdate = (newBio: string) => {
    setCurrentBio(newBio);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 page-transition">
        {/* Hero Section */}
        <section id="about" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4 py-16 md:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            {typedTitle}
            {showCursor && <span className="typewriter-cursor">|</span>}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
            I'm a passionate entrepreneur driven by creativity, curiosity, and the desire to build something that makes a difference. I believe in solving real problems, telling impactful stories, and turning bold ideas into reality.
          </p>
        </section>

        {/* About Me Details & Bio Generator */}
        <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
          <div className="py-6 md:py-8">
            <h2 className="mb-4 text-2xl font-semibold text-primary flex items-center">
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

          <div id="bio-generator">
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
