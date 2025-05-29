
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, UserCircle2, Code, Brain, Palette, Lightbulb } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import section components
import AchievementsSection from "@/app/(main)/achievements/page";
import ProjectsSection from "@/app/(main)/projects/page";
import ContactSection from "@/app/(main)/contact/page";


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true); // Preloader state
  const [currentBio, setCurrentBio] = useState<string>(
    "I’m a passionate 8th grader at Stiles Middle School with a strong interest in entrepreneurship, creativity, and making a difference through innovative ideas. I enjoy coming up with original solutions, exploring new projects, and learning through hands-on experience. I’m driven by curiosity, motivated by impact, and always ready to grow and take on something new."
  );

  const fullTitle = "Hi, I'm Dhriti";
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    let typingTimeoutId: NodeJS.Timeout;
    if (typedTitle.length < fullTitle.length) {
      setShowCursor(true);
      typingTimeoutId = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, 100);
    } else {
      const cursorHideTimeoutId = setTimeout(() => {
        setShowCursor(false);
      }, 500); 
      return () => clearTimeout(cursorHideTimeoutId);
    }
    return () => clearTimeout(typingTimeoutId);
  }, [typedTitle, fullTitle, isLoading]);


  if (isLoading) {
    return <Preloader onLoaded={() => setIsLoading(false)} />;
  }

  const areasOfInterest = [
    {
      icon: Code,
      title: "Web Development",
      description: "Building responsive and engaging web experiences with modern technologies.",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Tackling challenges with analytical thinking and innovative solutions.",
    },
    {
      icon: Lightbulb,
      title: "Entrepreneurship",
      description: "Developing innovative ideas and turning them into impactful ventures.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 page-transition">
        {/* Hero Section */}
        <section id="about" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4 py-16 md:py-24 bg-background">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-primary">
            {typedTitle}
            {showCursor && <span className="typewriter-cursor">|</span>}
          </h1>
          <p className="mt-8 max-w-3xl font-[var(--font-merriweather)] text-[20px] text-foreground/90">
            I'm a passionate entrepreneur driven by creativity, curiosity, and the desire to build something that makes a difference. I believe in solving real problems, telling impactful stories, and turning bold ideas into reality.
          </p>
          <div className="mt-12 flex flex-col items-center animate-subtle-blink">
            <p className="text-base text-muted-foreground">Scroll down to explore</p>
            <ChevronDown className="h-8 w-8 text-muted-foreground mt-1" />
          </div>
        </section>

        {/* About Me Details */}
        <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
         <Card className="shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">About Me</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-8 md:px-8">
              <section className="mb-10">
                <h3 className="mb-3 text-xl font-semibold text-accent">
                  Who I Am
                </h3>
                <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
                  <p>{currentBio}</p>
                  <p>
                    Beyond my professional pursuits, I enjoy painting,
                    which helps me maintain a fresh perspective and creative drive. I'm always open
                    to new challenges and collaborations that push boundaries and create value.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="mb-6 text-xl font-semibold text-accent">
                  Areas of Interest
                </h3>
                <div className="grid gap-8 md:grid-cols-3">
                  {areasOfInterest.map((interest, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg ">
                      <interest.icon className="h-12 w-12 mb-3 text-accent" />
                      <h4 className="mb-1 text-lg font-medium text-foreground">{interest.title}</h4>
                      <p className="text-sm text-muted-foreground">{interest.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <section id="achievements" className="py-12 md:py-16 bg-primary/10 dark:bg-primary/5">
          <AchievementsSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-16">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-16 bg-primary/10 dark:bg-primary/5">
          <ContactSection />
        </section>

      </main>
      <Footer />
    </div>
  );
}
