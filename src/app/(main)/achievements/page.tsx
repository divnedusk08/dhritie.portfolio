
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, CalendarDays, CheckCircle, Star, ExternalLink, Lightbulb } from "lucide-react";

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
    id: "5",
    title: "NJHS Member",
    issuer: "fsms.njhs@leanderisd.org",
    date: "May 14, 2025",
    description: "As an NJHS member, I’m committed to academic excellence, leadership, and service. I strive to set a positive example, give back to my community, and grow as a responsible and respectful student.",
    icon: Star,
    category: "Recognition",
    certificateUrl: "https://www.canva.com/design/DAGoyESDlWA/MA5K589KntScG5sSdWa-wg/view?utm_content=DAGoyESDlWA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h86560a1732",
  },
  {
    id: "8",
    title: "NJHS Officer",
    issuer: undefined,
    date: "May 21, 2025",
    description: "As an NJHS Officer, I take pride in leading with integrity, responsibility, and a commitment to service. I help organize events, support fellow members, and represent our chapter’s core values of scholarship, leadership, service, character, and citizenship. This role allows me to grow as a leader while making a positive impact on my school and community.",
    icon: Star,
    category: "Recognition",
    certificateUrl: "https://www.canva.com/design/DAGoyRvEA3Y/B8cbHCnuWCgMTO_-QkcPdQ/view?utm_content=DAGoyRvEA3Y&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3242b9cc6a",
  },
  {
    id: "6",
    title: "Entrepreneur of the Year",
    issuer: "Lisa Hood",
    date: "May 24, 2025",
    description: "Being recognized as Entrepreneur of the Year is an honor that reflects my passion for innovation, problem-solving, and turning ideas into action. This achievement represents my commitment to creativity, leadership, and making a real impact through projects that matter.",
    icon: Lightbulb,
    category: "Award",
    certificateUrl: "https://www.canva.com/design/DAGoyKfr944/ruAXSbeMeYR8GYsFBr_2fQ/view?utm_content=DAGoyKfr944&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h573e089b61",
  },
  {
    id: "7",
    title: "1st Place – Most Innovative Product Idea (LED Wishes)",
    issuer: undefined,
    date: "May 24, 2025",
    description: "Winning 1st place for the Most Innovative Product Idea with LED Wishes reflects my passion for combining creativity and purpose. LED Wishes is a unique concept designed to bring light and positivity into people's lives—literally and symbolically.",
    icon: Lightbulb,
    category: "Award",
    certificateUrl: "https://www.canva.com/design/DAGoyYK4vys/nmDmYpj_l_tVIlMOZTx64Q/view?utm_content=DAGoyYK4vys&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h51fb745301",
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
