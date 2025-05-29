
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, CalendarDays, CheckCircle, Star, ExternalLink } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
  icon: React.ElementType;
  category: "Award" | "Certification" | "Recognition" | "Project Milestone";
  certificateUrl?: string;
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
    certificateUrl: "#",
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
  {
    id: "5",
    title: "NJHS Member",
    issuer: "fsms.njhs@leanderisd.org",
    date: "May 14, 2025",
    description: "As an NJHS member, I’m committed to academic excellence, leadership, and service. I strive to set a positive example, give back to my community, and grow as a responsible and respectful student.",
    icon: Star,
    category: "Recognition",
    certificateUrl: "https://www.canva.com/design/DAGoyESDlWA/MA5K589KntScG5sSdWa-wg/view?utm_content=DAGoyESDlWA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h86560a1732",
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
            <CardFooter className="border-t bg-card p-4 flex justify-between items-center">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {achievement.category}
                </span>
                {(() => {
                  const url = achievement.certificateUrl;
                  // Condition for an enabled button: URL must exist, not be empty/whitespace, and not be "#"
                  if (url && url.trim() !== "" && url !== "#") {
                    return (
                      <Button asChild variant="outline" size="sm">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Certificate
                        </a>
                      </Button>
                    );
                  } else if (typeof url === 'string') {
                    // If url is a string but doesn't meet the criteria for an enabled button (e.g., it's "#", "", or "   ")
                    // then show a disabled button.
                    return (
                       <Button variant="outline" size="sm" disabled title="Certificate URL not yet provided or is invalid">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Certificate
                        </Button>
                    );
                  }
                  // If url is null or undefined, render nothing for the certificate button.
                  return null;
                })()}
            </CardFooter>
          </Card>
        ))}
      </div>
       {achievementsData.length === 0 && (
        <p className="text-center text-muted-foreground">No achievements to display yet.</p>
      )}
    </div>
  );
}
