
"use client"; // From src/app/(main)/page.tsx

import { useState } from "react";
import Image from "next/image";
import { BioGeneratorForm } from "@/components/about/bio-generator-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
        <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
          <section className="mb-12">
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-muted/30 p-6 md:p-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                  <Image
                    src="https://placehold.co/120x120.png"
                    alt="Your Name"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-primary shadow-md"
                    data-ai-hint="profile picture"
                  />
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                      Your Name Here
                    </h1>
                    <p className="mt-1 text-lg text-muted-foreground md:text-xl">
                      Your Profession / Tagline
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-semibold text-primary flex items-center">
                  <UserCircle2 className="mr-3 h-7 w-7" />
                  About Me
                </h2>
                <div className="prose prose-lg max-w-none text-foreground/90">
                  <p>{currentBio}</p>
                  <p>
                    Beyond my professional pursuits, I enjoy [mention a hobby or interest], 
                    which helps me maintain a fresh perspective and creative drive. I'm always open 
                    to new challenges and collaborations that push boundaries and create value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-12" />

          <section>
            <BioGeneratorForm onBioGenerated={handleBioUpdate} initialBio={currentBio} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
