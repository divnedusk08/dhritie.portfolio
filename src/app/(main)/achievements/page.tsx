
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, CalendarDays, CheckCircle, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
  icon: React.ElementType;
  category: "Award" | "Certification" | "Recognition" | "Project Milestone";
}

const achievementsData: Achievement[] = [
  {
    id: "1",
    title: "Innovator of the Year",
    issuer: "Tech Solutions Inc.",
    date: "March 2023",
    description: "Awarded for developing a groundbreaking AI-driven platform that revolutionized customer engagement.",
    icon: Award,
    category: "Award",
  },
  {
    id: "2",
    title: "Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "June 2022",
    description: "Validated expertise in AWS Cloud concepts, services, security, architecture, pricing, and support.",
    icon: CheckCircle,
    category: "Certification",
  },
  {
    id: "3",
    title: "Top Performer Q3 2023",
    issuer: "Internal Recognition",
    date: "September 2023",
    description: "Recognized for exceeding performance targets and significant contributions to team projects.",
    icon: Star,
    category: "Recognition",
  },
  {
    id: "4",
    title: "Project Phoenix Launch",
    issuer: "Self-led Initiative",
    date: "December 2023",
    description: "Successfully launched Project Phoenix, a community-focused application, reaching 10,000 active users in the first month.",
    icon: Briefcase,
    category: "Project Milestone",
  },
];

export default function AchievementsSection() {
  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Achievements
        </h2>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          A showcase of my awards, certifications, and recognitions.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {achievementsData.map((achievement) => (
          <Card key={achievement.id} className="flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="bg-muted/30 p-6">
              <div className="flex items-start gap-4">
                <span className="rounded-full bg-accent p-3 text-accent-foreground">
                  <achievement.icon className="h-6 w-6" />
                </span>
                <div>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {achievement.title}
                  </CardTitle>
                  {achievement.issuer && (
                    <CardDescription className="text-sm text-muted-foreground">
                      Issued by: {achievement.issuer}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <p className="mb-4 text-foreground/90">{achievement.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>{achievement.date}</span>
              </div>
            </CardContent>
            <div className="border-t bg-card p-4 text-right">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {achievement.category}
                </span>
            </div>
          </Card>
        ))}
      </div>
       {achievementsData.length === 0 && (
        <p className="text-center text-muted-foreground">No achievements to display yet.</p>
      )}
    </div>
  );
}
